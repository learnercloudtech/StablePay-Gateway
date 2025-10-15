
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative';
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, change, changeType }) => {
  const changeColor = changeType === 'positive' ? 'text-green-400' : 'text-red-400';

  return (
    <div className="bg-surface rounded-lg p-6 shadow-lg flex-1">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-sm text-text-secondary uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-text-primary mt-1">{typeof value === 'number' ? `$${value.toLocaleString()}` : value}</p>
        </div>
        <div className="bg-gray-800 p-3 rounded-full">
          {icon}
        </div>
      </div>
      {change && (
        <p className={`text-sm mt-2 ${changeColor}`}>
          {change} vs last month
        </p>
      )}
    </div>
  );
};
