export type TransactionType = 'award' | 'redeem' | 'adjust';

export type TransactionStatus = 'pending' | 'settled' | 'reversed';

export interface LedgerTransaction {
  txId: string;
  userId: string;
  amount: number; // positive for award, negative for redeem
  type: TransactionType;
  status: TransactionStatus;
  createdAt: string;
  metadata?: Record<string, any>;
}

export class InMemoryLedger {
  private txIndex: Map<string, LedgerTransaction> = new Map();
  private userTxs: Map<string, LedgerTransaction[]> = new Map();

  createTransaction(tx: LedgerTransaction): LedgerTransaction {
    // Idempotent: if txId already exists, return existing
    const existing = this.txIndex.get(tx.txId);
    if (existing) return existing;

    const copy: LedgerTransaction = { ...tx };
    this.txIndex.set(copy.txId, copy);
    const arr = this.userTxs.get(copy.userId) || [];
    arr.push(copy);
    this.userTxs.set(copy.userId, arr);
    return copy;
  }

  getTransaction(txId: string): LedgerTransaction | undefined {
    return this.txIndex.get(txId);
  }

  settleTransaction(txId: string): LedgerTransaction | undefined {
    const tx = this.txIndex.get(txId);
    if (!tx) return undefined;
    if (tx.status === 'settled') return tx;
    tx.status = 'settled';
    return tx;
  }

  reverseTransaction(txId: string, reversalTx: LedgerTransaction): LedgerTransaction | undefined {
    const tx = this.txIndex.get(txId);
    if (!tx) return undefined;
    // mark original as referenced by reversal (keep status settled for audit trail)
    tx.metadata = { ...(tx.metadata || {}), reversedBy: reversalTx.txId };
    // create reversal tx (idempotent)
    return this.createTransaction(reversalTx);
  }

  getBalance(userId: string): number {
    const txs = this.userTxs.get(userId) || [];
    // Only settled transactions count
    return txs.reduce((sum, t) => (t.status === 'settled' ? sum + t.amount : sum), 0);
  }

  reset(): void {
    this.txIndex.clear();
    this.userTxs.clear();
  }
}

const defaultLedger = new InMemoryLedger();

// convenience methods for tests and simple usage
export function getLedgerInstance() {
  return defaultLedger;
}

export default InMemoryLedger;

// expose helper to retrieve all transactions (for compatibility with existing inMemoryStore listLedger)
export function getAllTransactions() {
  // return array in insertion order
  return Array.from(defaultLedger['txIndex'].values());
}
