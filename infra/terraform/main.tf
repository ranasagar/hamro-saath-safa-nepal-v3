terraform {
  required_version = ">= 1.3.0"
}

provider "aws" {
  region = var.region
}

/* Backend configuration omitted intentionally — configure remote state (S3 + Dynamo) per environment */

/* Suggested resources (examples only) */

/* S3 bucket for object storage (images) */
resource "aws_s3_bucket" "images" {
  bucket = "${var.project_name}-${var.env}-images"
  acl    = "private"
  tags = {
    Project = var.project_name
    Env     = var.env
  }
}

/* RDS placeholder (Postgres) */
resource "aws_db_instance" "postgres" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "13"
  instance_class       = "db.t3.micro"
  name                 = "hamrosaath"
  username             = var.db_username
  password             = var.db_password
  skip_final_snapshot  = true
  publicly_accessible  = false
  tags = {
    Project = var.project_name
    Env     = var.env
  }
}
