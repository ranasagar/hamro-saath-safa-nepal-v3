-- Migration 001: create ledger_transactions and idempotency_keys tables

CREATE TABLE IF NOT EXISTS ledger_transactions (
  txId TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  createdAt TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  metadata JSONB
);

CREATE TABLE IF NOT EXISTS idempotency_keys (
  key TEXT PRIMARY KEY,
  status INTEGER,
  body JSONB,
  createdAt TIMESTAMP WITHOUT TIME ZONE
);
