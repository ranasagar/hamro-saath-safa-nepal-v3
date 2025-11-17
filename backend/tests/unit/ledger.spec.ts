import { expect } from 'chai';
import InMemoryLedger, { LedgerTransaction } from '../../src/models/ledger.ts';

describe('InMemoryLedger', () => {
  let ledger: InMemoryLedger;

  beforeEach(() => {
    ledger = new InMemoryLedger();
  });

  it('computes balance only from settled transactions', () => {
    const tx: LedgerTransaction = {
      txId: 'tx_pending',
      userId: 'user1',
      amount: 100,
      type: 'award',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    ledger.createTransaction(tx);
    expect(ledger.getBalance('user1')).to.equal(0);

    ledger.settleTransaction('tx_pending');
    expect(ledger.getBalance('user1')).to.equal(100);
  });

  it('is idempotent when creating the same tx twice', () => {
    const tx: LedgerTransaction = {
      txId: 'tx_idem',
      userId: 'user2',
      amount: 50,
      type: 'award',
      status: 'settled',
      createdAt: new Date().toISOString(),
    };
    ledger.createTransaction(tx);
    ledger.createTransaction(tx); // should be no-op
    expect(ledger.getBalance('user2')).to.equal(50);
  });

  it('supports reversals via reverseTransaction', () => {
    const tx: LedgerTransaction = {
      txId: 'tx_to_reverse',
      userId: 'user3',
      amount: 200,
      type: 'award',
      status: 'settled',
      createdAt: new Date().toISOString(),
    };
    ledger.createTransaction(tx);
    expect(ledger.getBalance('user3')).to.equal(200);

    const reversal: LedgerTransaction = {
      txId: 'tx_rev_1',
      userId: 'user3',
      amount: -200,
      type: 'adjust',
      status: 'settled',
      createdAt: new Date().toISOString(),
      metadata: { reversedTx: 'tx_to_reverse' },
    };
  ledger.reverseTransaction('tx_to_reverse', reversal);
  expect(ledger.getBalance('user3')).to.equal(0);
  const orig = ledger.getTransaction('tx_to_reverse');
  expect(orig).to.exist;
  // original remains settled for audit; reversal is recorded in metadata
  expect(orig!.status).to.equal('settled');
  expect(orig!.metadata).to.have.property('reversedBy', 'tx_rev_1');
  });
});
