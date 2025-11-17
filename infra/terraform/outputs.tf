output "s3_images_bucket" {
  value = aws_s3_bucket.images.bucket
}

output "rds_endpoint" {
  value = aws_db_instance.postgres.endpoint
}
