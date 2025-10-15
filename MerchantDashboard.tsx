
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Merchant, Transaction, Payout } from '../types';
import { DashboardCard } from './DashboardCard';
import { TransactionTable } from './TransactionTable';
import { DollarSignIcon, BriefcaseIcon } from './icons';

interface MerchantDashboardProps {
  merchant: Merchant;
  transactions: Transaction[];
  payouts: Payout[];
  stablecoinValue: number;
}

const chartData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];


export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({ merchant, transactions, payouts, stablecoinValue }) => {
  const merchantTransactions = transactions.filter(tx => tx.merchantId === merchant.id);
  const totalVolume = merchantTransactions.reduce((acc, tx) => acc + tx.amount, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Merchant Dashboard</h1>

      <div className="flex gap-6 mb-8">
        <DashboardCard
          title="Ledger Balance"
          value={merchant.ledgerBalance * stablecoinValue}
          icon={<DollarSignIcon className="w-6 h-6 text-primary" />}
        />
        <DashboardCard
          title="Total Volume (30d)"
          value={totalVolume}
          icon={<BriefcaseIcon className="w-6 h-6 text-secondary" />}
          change="+5.2%"
          changeType="positive"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Revenue This Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Settings & Payouts</h3>
          <div>
            <p className="text-sm text-text-secondary">Payout Preference</p>
            <p className="font-semibold">{merchant.payoutPreference}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm text-text-secondary">Payout Destination</p>
            <p className="font-semibold text-sm">{merchant.payoutAddress}</p>
          </div>
           <button className="w-full mt-6 bg-primary hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">
            Request Payout
          </button>
          <p className="text-xs text-text-secondary mt-2 text-center">Simulates calling Onramper/BCB Group API for fiat or custody transfer for stablecoins.</p>
          
          <h4 className="font-bold mt-6 mb-2">Payout History</h4>
          <ul className="text-sm space-y-2">
            {payouts.map(p => (
                <li key={p.id} className="flex justify-between">
                    <span>{new Date(p.timestamp).toLocaleDateString()}</span>
                    <span className="font-mono">${p.amount.toFixed(2)}</span>
                </li>
            ))}
          </ul>
        </div>
      </div>
      
      <TransactionTable transactions={merchantTransactions} title="Incoming Payments" />
    </div>
  );
};
