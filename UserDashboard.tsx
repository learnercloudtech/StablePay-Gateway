
import React from 'react';
import type { User, Transaction } from '../types';
import { KycTier } from '../types';
import { DashboardCard } from './DashboardCard';
import { TransactionTable } from './TransactionTable';
import { WalletIcon, CheckCircleIcon, AlertTriangleIcon } from './icons';

interface UserDashboardProps {
  user: User;
  transactions: Transaction[];
  onPay: () => void;
}

const kycInfo = {
  [KycTier.None]: { text: 'Not Verified', limit: '$0/day', color: 'text-red-400', icon: <AlertTriangleIcon className="w-5 h-5" /> },
  [KycTier.Tier1]: { text: 'Tier 1 Verified', limit: '$100/day', color: 'text-yellow-400', icon: <AlertTriangleIcon className="w-5 h-5" /> },
  [KycTier.Tier2]: { text: 'Tier 2 Verified', limit: '$10,000/day', color: 'text-green-400', icon: <CheckCircleIcon className="w-5 h-5" /> },
};

export const UserDashboard: React.FC<UserDashboardProps> = ({ user, transactions, onPay }) => {
  const userTransactions = transactions.filter(tx => tx.userId === user.id);
  const totalSpent = userTransactions.reduce((acc, tx) => acc + tx.amount, 0);
  const kyc = kycInfo[user.kycTier];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <button onClick={onPay} className="bg-primary hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
            Make a Payment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Wallet Status"
          value="Connected"
          icon={<WalletIcon className="w-6 h-6 text-accent" />}
        />
        <DashboardCard
          title="Total Spent"
          value={totalSpent}
          icon={<WalletIcon className="w-6 h-6 text-accent" />}
        />
        <div className="bg-surface rounded-lg p-6 shadow-lg">
          <p className="text-sm text-text-secondary uppercase tracking-wider">KYC Status</p>
          <div className={`flex items-center gap-2 mt-2 ${kyc.color}`}>
            {kyc.icon}
            <span className="text-xl font-bold">{kyc.text}</span>
          </div>
          <p className="text-text-secondary text-sm mt-1">Transaction Limit: {kyc.limit}</p>
          {user.kycTier !== KycTier.Tier2 && (
             <button className="text-xs bg-secondary/80 hover:bg-secondary text-white font-bold py-1 px-3 rounded-full mt-3">
                Upgrade KYC
            </button>
          )}
          <p className="text-xs text-text-secondary mt-2">Simulates Onfido/Jumio integration</p>
        </div>
      </div>
      
      <TransactionTable transactions={userTransactions} title="Your Transaction History" />
    </div>
  );
};
