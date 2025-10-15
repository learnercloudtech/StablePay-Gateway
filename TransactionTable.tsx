
import React from 'react';
import type { Transaction } from '../types';
import { TransactionStatus } from '../types';

interface TransactionTableProps {
  transactions: Transaction[];
  title: string;
}

const statusStyles: { [key in TransactionStatus]: string } = {
  [TransactionStatus.Completed]: 'bg-green-500/10 text-green-400',
  [TransactionStatus.Pending]: 'bg-yellow-500/10 text-yellow-400',
  [TransactionStatus.Failed]: 'bg-red-500/10 text-red-400',
  [TransactionStatus.Flagged]: 'bg-purple-500/10 text-purple-400',
};

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, title }) => {
  return (
    <div className="bg-surface rounded-lg p-6 shadow-lg mt-8">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border text-sm text-text-secondary">
              <th className="py-3 px-4 font-semibold">Transaction ID</th>
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold">Amount</th>
              <th className="py-3 px-4 font-semibold">Coin</th>
              <th className="py-3 px-4 font-semibold">Network</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Sanctions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} className="border-b border-border hover:bg-gray-700/50">
                <td className="py-3 px-4 text-sm font-mono">{tx.id}</td>
                <td className="py-3 px-4 text-sm">{new Date(tx.timestamp).toLocaleString()}</td>
                <td className="py-3 px-4 font-semibold">${tx.amount.toFixed(2)}</td>
                <td className="py-3 px-4 text-sm">{tx.stablecoin}</td>
                <td className="py-3 px-4 text-sm">{tx.network}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[tx.status]}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tx.sanctionsCheck === 'Passed' ? 'text-green-400' : 
                        tx.sanctionsCheck === 'Failed' ? 'text-red-400' : 'text-yellow-400'
                     }`}>
                        {tx.sanctionsCheck}
                     </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
