
export enum KycTier {
  None = 'None',
  Tier1 = 'Tier 1',
  Tier2 = 'Tier 2',
}

export interface User {
  id: string;
  email: string;
  phone: string;
  kycTier: KycTier;
  walletAddress: string;
}

export enum PayoutPreference {
  Stablecoin = 'Stablecoin',
  Fiat = 'Fiat',
}

export interface Merchant {
  id: string;
  name: string;
  payoutPreference: PayoutPreference;
  payoutAddress: string; // bank account or wallet address
  ledgerBalance: number;
}

export enum TransactionStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
  Flagged = 'Flagged',
}

export enum Stablecoin {
  USDT = 'USDT',
  USDC = 'USDC',
}

export enum Network {
  TRC20 = 'TRC-20 (Tron)',
  Solana = 'Solana',
  Polygon = 'Polygon',
  BSC = 'BSC',
}

export interface Transaction {
  id: string;
  userId: string;
  merchantId: string;
  amount: number;
  stablecoin: Stablecoin;
  network: Network;
  status: TransactionStatus;
  timestamp: string;
  sanctionsCheck: 'Passed' | 'Failed' | 'Pending';
}

export interface Payout {
  id: string;
  merchantId: string;
  amount: number;
  type: PayoutPreference;
  destination: string;
  timestamp: string;
  status: 'Completed' | 'Processing';
}

export interface ComplianceLog {
  id: string;
  timestamp: string;
  event: string;
  details: string;
  entityType: 'User' | 'Transaction' | 'Merchant';
  entityId: string;
}
