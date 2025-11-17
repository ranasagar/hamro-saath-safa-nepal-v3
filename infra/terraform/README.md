# Terraform skeleton (AWS) — Hamro Saath

This folder provides a minimal Terraform skeleton to bootstrap AWS resources for dev/staging/prod. It's intentionally minimal and meant as a starting point for the infra team.

Important: Do NOT run `apply` against production without reviewing, adding remote state, and setting proper IAM permissions.

Structure
- `main.tf` — provider and common settings
- `variables.tf` — variables for region, env, and names
- `outputs.tf` — suggested outputs
- `modules/` — suggested module boundaries (networking, rds, storage)

Getting started (local dev)
1. Install Terraform (1.5+ recommended)
2. Configure AWS credentials in environment (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY)
3. Initialize

```bash
terraform init
terraform plan -var 'env=dev' -out plan.tfplan
```

To apply to a real account, create an S3 backend bucket and configure backend in `main.tf`.

This is a template: update CIDR ranges, instance sizes, and security controls before using in production.
