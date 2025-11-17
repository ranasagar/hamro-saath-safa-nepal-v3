<#
.SYNOPSIS
  Create GitHub issues from a backlog JSON file.

.DESCRIPTION
  Reads `.specify/tasks/backlog-issues-payload.json` (array of objects with title, body, labels)
  and creates GitHub issues via the REST API. Supports dry-run, optional duplicate-title check,
  and accepts owner/repo and token parameters. If token is not provided it will use the
  GITHUB_TOKEN environment variable.

.PARAMETER Owner
  GitHub repository owner (user or org).

.PARAMETER Repo
  GitHub repository name.

.PARAMETER Token
  GitHub personal access token with `repo` scope. If omitted, the script reads $env:GITHUB_TOKEN.

.PARAMETER BacklogFile
  Path to the backlog JSON file. Defaults to `.specify/tasks/backlog-issues-payload.json`.

.PARAMETER DryRun
  If set, the script will print the payloads and not call the API.

.EXAMPLE
  .\create-issues-from-backlog.ps1 -Owner myorg -Repo myrepo -DryRun

.NOTES
  - This script is intended to be run locally. It does not store secrets.
  - It will do a simple duplicate-title check by listing existing open issues (first page only).
#>

param(
    [Parameter(Mandatory=$true)] [string]$Owner,
    [Parameter(Mandatory=$true)] [string]$Repo,
    [string]$Token = $env:GITHUB_TOKEN,
    [string]$BacklogFile = ".specify/tasks/backlog-issues-payload.json",
    [switch]$DryRun
)

function Read-JsonFile([string]$path) {
    if (-not (Test-Path $path)) {
        Write-Error "Backlog file not found: $path"
        exit 1
    }
    $text = Get-Content -Raw -Path $path
    return ConvertFrom-Json $text
}

if (-not $Token) {
    Write-Error "No GitHub token provided. Set the GITHUB_TOKEN environment variable or pass -Token <token>."
    exit 1
}

$payloads = Read-JsonFile $BacklogFile
if ($null -eq $payloads -or $payloads.Count -eq 0) {
    Write-Host "No payloads found in $BacklogFile"
    exit 0
}

Write-Host "Preparing to create $($payloads.Count) issues in $Owner/$Repo. DryRun=$DryRun"

function Get-ExistingIssueTitles() {
    try {
        $url = "https://api.github.com/repos/$Owner/$Repo/issues?state=all&per_page=100"
        $headers = @{ Authorization = "token $Token"; 'User-Agent' = 'create-issues-script' }
        $resp = Invoke-RestMethod -Uri $url -Headers $headers -Method Get
        return $resp.title
    } catch {
        Write-Warning "Could not list existing issues: $($_.Exception.Message)"
        return @()
    }
}

$existingTitles = Get-ExistingIssueTitles

$i = 0
foreach ($item in $payloads) {
    $i++
    $title = $item.title
    $body = $item.body
    $labels = $item.labels -join ','

    if ($existingTitles -contains $title) {
        Write-Host "[$i/$($payloads.Count)] Skipping existing issue: $title"
        continue
    }

    $postBody = @{ title = $title; body = $body }
    if ($item.labels) { $postBody.labels = $item.labels }

    if ($DryRun) {
        Write-Host "[$i/$($payloads.Count)] DRY-RUN: Would create issue: $title"
        continue
    }

    try {
        $url = "https://api.github.com/repos/$Owner/$Repo/issues"
        $headers = @{ Authorization = "token $Token"; 'User-Agent' = 'create-issues-script' }
        $json = $postBody | ConvertTo-Json -Depth 5
        $resp = Invoke-RestMethod -Uri $url -Headers $headers -Method Post -Body $json -ContentType 'application/json'
        Write-Host "[$i/$($payloads.Count)] Created: $($resp.html_url)"
    } catch {
        Write-Error "Failed to create issue '$title': $($_.Exception.Message)"
    }
}

Write-Host "Done."
