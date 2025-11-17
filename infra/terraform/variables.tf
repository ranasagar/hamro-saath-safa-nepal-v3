variable "region" {
  type    = string
  default = "us-east-1"
}

variable "env" {
  type    = string
  default = "dev"
}

variable "project_name" {
  type    = string
  default = "hamro-saath"
}

variable "db_username" {
  type    = string
  default = "hamro_admin"
}

variable "db_password" {
  type    = string
  description = "Set via environment variables or a secrets manager, do not commit real passwords"
  default = "changeme"
}
