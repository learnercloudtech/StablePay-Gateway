
import React, { useState } from 'react';
import type { User, Merchant, Transaction, Payout, ComplianceLog } from './types';
import { MOCK_USER, MOCK_MERCHANT, MOCK_TRANSACTIONS, MOCK_PAYOUTS, MOCK_COMPLIANCE_LOGS } from './constants';
import { HomeIcon, BriefcaseIcon, ShieldIcon } from './components/icons';
import { UserDashboard } from './components/UserDashboard';
import { MerchantDashboard } from './components/MerchantDashboard';
import { AdminPanel } from './components/AdminPanel';
import { PaymentModal } from './components/PaymentModal';


type View = 'user' | 'merchant' | 'admin';

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <li
    onClick={onClick}
    className={`flex items-center p-3 my-2 cursor-pointer rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-surface'}`}
  >
    {icon}
    <span className="ml-4 font-semibold">{label}</span>
  </li>
);

const App: React.FC = () => {
  const [view, setView] = useState<View>('merchant');
  const [user] = useState<User>(MOCK_USER);
  const [merchant, setMerchant] = useState<Merchant>(MOCK_MERCHANT);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [payouts] = useState<Payout[]>(MOCK_PAYOUTS);
  const [logs] = useState<ComplianceLog[]>(MOCK_COMPLIANCE_LOGS);
  const [depegActive, setDepegActive] = useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  const stablecoinValue = depegActive ? 0.95 : 1.0;

  const handlePaymentSuccess = (newTx: Transaction) => {
    setTransactions(prev => [newTx, ...prev]);
    setMerchant(prev => ({...prev, ledgerBalance: prev.ledgerBalance + newTx.amount}));
  };

  const renderView = () => {
    switch (view) {
      case 'user':
        return <UserDashboard user={user} transactions={transactions} onPay={() => setPaymentModalOpen(true)} />;
      case 'merchant':
        return <MerchantDashboard merchant={merchant} transactions={transactions} payouts={payouts} stablecoinValue={stablecoinValue} />;
      case 'admin':
        return <AdminPanel logs={logs} transactions={transactions} depegActive={depegActive} toggleDepeg={() => setDepegActive(!depegActive)} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background font-sans">
      {isPaymentModalOpen && <PaymentModal user={user} merchant={merchant} onClose={() => setPaymentModalOpen(false)} onPaymentSuccess={handlePaymentSuccess} />}
      <aside className="w-64 bg-background border-r border-border p-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-white mb-10">StablePay</h1>
        <nav>
          <ul>
            <NavItem icon={<BriefcaseIcon className="w-5 h-5" />} label="Merchant" isActive={view === 'merchant'} onClick={() => setView('merchant')} />
            <NavItem icon={<HomeIcon className="w-5 h-5" />} label="User" isActive={view === 'user'} onClick={() => setView('user')} />
            <NavItem icon={<ShieldIcon className="w-5 h-5" />} label="Admin" isActive={view === 'admin'} onClick={() => setView('admin')} />
          </ul>
        </nav>
        <div className="absolute bottom-6 text-xs text-text-secondary">
          <p>This is a prototype application.</p>
          <p>All data is simulated.</p>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
