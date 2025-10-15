
import React from 'react';
import type { ComplianceLog, Transaction } from '../types';
import { TransactionStatus } from '../types';
import { DashboardCard } from './DashboardCard';
import { AlertTriangleIcon } from './icons';

interface AdminPanelProps {
  logs: ComplianceLog[];
  transactions: Transaction[];
  depegActive: boolean;
  toggleDepeg: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ logs, transactions, depegActive, toggleDepeg }) => {
  const flaggedTransactions = transactions.filter(tx => tx.status === TransactionStatus.Flagged);
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin & Compliance Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Hot Wallet Balance" value={75300.25} icon={<AlertTriangleIcon className="w-6 h-6 text-yellow-400" />} />
        <DashboardCard title="Cold Storage" value={12500000} icon={<AlertTriangleIcon className="w-6 h-6 text-blue-400" />} />
        <DashboardCard title="Reserve Fund" value={2500000} icon={<AlertTriangleIcon className="w-6 h-6 text-green-400" />} />
        <div className="bg-surface rounded-lg p-6 shadow-lg flex-1">
          <h3 className="text-sm text-text-secondary uppercase tracking-wider">System Controls</h3>
          <div className="mt-4">
            <label htmlFor="depeg-toggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" id="depeg-toggle" className="sr-only" checked={depegActive} onChange={toggleDepeg} />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${depegActive ? 'transform translate-x-full bg-secondary' : ''}`}></div>
              </div>
              <div className="ml-3 text-text-primary font-medium">
                Simulate De-peg Event
              </div>
            </label>
            <p className="text-xs text-text-secondary mt-1">Toggles a -5% value adjustment on stablecoins.</p>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-lg p-6 shadow-lg mt-8">
        <h3 className="text-xl font-bold mb-4">Compliance Audit Trail</h3>
        <div className="overflow-x-auto h-96">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border text-sm text-text-secondary">
                <th className="py-3 px-4 font-semibold">Timestamp</th>
                <th className="py-3 px-4 font-semibold">Event</th>
                <th className="py-3 px-4 font-semibold">Details</th>
                <th className="py-3 px-4 font-semibold">Entity</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="border-b border-border hover:bg-gray-700/50">
                  <td className="py-3 px-4 text-sm font-mono">{new Date(log.timestamp).toISOString()}</td>
                  <td className="py-3 px-4 text-sm">{log.event}</td>
                  <td className="py-3 px-4 text-sm">{log.details}</td>
                  <td className="py-3 px-4 text-sm font-mono">{log.entityType}/{log.entityId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-surface rounded-lg p-6 shadow-lg mt-8">
        <h3 className="text-xl font-bold mb-4 text-red-400">Flagged Transactions for Review</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border text-sm text-text-secondary">
                <th className="py-3 px-4 font-semibold">Transaction ID</th>
                <th className="py-3 px-4 font-semibold">User ID</th>
                <th className="py-3 px-4 font-semibold">Amount</th>
                <th className="py-3 px-4 font-semibold">Reason</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flaggedTransactions.map(tx => (
                <tr key={tx.id} className="border-b border-border">
                  <td className="py-3 px-4 text-sm font-mono">{tx.id}</td>
                  <td className="py-3 px-4 text-sm font-mono">{tx.userId}</td>
                  <td className="py-3 px-4 font-semibold">${tx.amount.toFixed(2)}</td>
                  <td className="py-3 px-4 text-sm text-red-400">{tx.sanctionsCheck}</td>
                  <td className="py-3 px-4">
                     <button className="text-xs bg-yellow-500/80 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded-full mr-2">Investigate</button>
                     <button className="text-xs bg-red-500/80 hover:bg-red-500 text-white font-bold py-1 px-3 rounded-full">Freeze Funds</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
