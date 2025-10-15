
import type { User, Merchant, Transaction, Payout, ComplianceLog } from './types';
import { KycTier, PayoutPreference, TransactionStatus, Stablecoin, Network } from './types';

export const MOCK_USER: User = {
  id: 'user-001',
  email: 'satoshi@nakamoto.com',
  phone: '+1-555-123-4567',
  kycTier: KycTier.Tier2,
  walletAddress: '0x1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
};

export const MOCK_MERCHANT: Merchant = {
  id: 'merch-001',
  name: 'Cyberdyne Systems',
  payoutPreference: PayoutPreference.Fiat,
  payoutAddress: 'Bank of America - ...XX4567',
  ledgerBalance: 12580.50,
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'txn-1', userId: 'user-001', merchantId: 'merch-001', amount: 150.00, stablecoin: Stablecoin.USDC, network: Network.Polygon, status: TransactionStatus.Completed, timestamp: '2023-10-27T10:00:00Z', sanctionsCheck: 'Passed' },
  { id: 'txn-2', userId: 'user-002', merchantId: 'merch-001', amount: 99.99, stablecoin: Stablecoin.USDT, network: Network.TRC20, status: TransactionStatus.Completed, timestamp: '2023-10-27T09:45:00Z', sanctionsCheck: 'Passed' },
  { id: 'txn-3', userId: 'user-003', merchantId: 'merch-001', amount: 1200.00, stablecoin: Stablecoin.USDC, network: Network.Solana, status: TransactionStatus.Flagged, timestamp: '2023-10-27T08:30:00Z', sanctionsCheck: 'Failed' },
  { id: 'txn-4', userId: 'user-001', merchantId: 'merch-001', amount: 25.50, stablecoin: Stablecoin.USDT, network: Network.BSC, status: TransactionStatus.Completed, timestamp: '2023-10-26T15:12:00Z', sanctionsCheck: 'Passed' },
  { id: 'txn-5', userId: 'user-004', merchantId: 'merch-001', amount: 75.00, stablecoin: Stablecoin.USDC, network: Network.Polygon, status: TransactionStatus.Pending, timestamp: '2023-10-26T14:00:00Z', sanctionsCheck: 'Pending' },
];

export const MOCK_PAYOUTS: Payout[] = [
    { id: 'payout-1', merchantId: 'merch-001', amount: 5000.00, type: PayoutPreference.Fiat, destination: '...XX4567', timestamp: '2023-10-25T18:00:00Z', status: 'Completed' },
    { id: 'payout-2', merchantId: 'merch-001', amount: 2500.00, type: PayoutPreference.Fiat, destination: '...XX4567', timestamp: '2023-10-20T18:00:00Z', status: 'Completed' },
];

export const MOCK_COMPLIANCE_LOGS: ComplianceLog[] = [
    { id: 'log-1', timestamp: '2023-10-27T10:00:05Z', event: 'Sanctions Check', details: 'Chainalysis API: Passed', entityType: 'Transaction', entityId: 'txn-1' },
    { id: 'log-2', timestamp: '2023-10-27T08:30:10Z', event: 'Sanctions Check', details: 'TRM API: Failed - High Risk', entityType: 'Transaction', entityId: 'txn-3' },
    { id: 'log-3', timestamp: '2023-10-27T08:31:00Z', event: 'Transaction Flagged', details: 'Automatic flag due to failed sanctions screen.', entityType: 'Transaction', entityId: 'txn-3' },
    { id: 'log-4', timestamp: '2023-10-26T11:00:00Z', event: 'KYC Update', details: 'User passed Tier 2 verification via Onfido.', entityType: 'User', entityId: 'user-001' },
    { id: 'log-5', timestamp: '2023-10-25T17:55:00Z', event: 'Payout Initiated', details: 'Fiat payout requested to Bank of America - ...XX4567', entityType: 'Merchant', entityId: 'merch-001' },
];
