
import React, { useState, useEffect } from 'react';
import type { User, Merchant } from '../types';
import { Stablecoin, Network, TransactionStatus } from '../types';

interface PaymentModalProps {
  user: User;
  merchant: Merchant;
  onClose: () => void;
  onPaymentSuccess: (newTx: any) => void;
}

const steps = [
  "Connecting Wallet...",
  "Verifying KYC Status...",
  "Screening via Chainalysis API...",
  "Broadcasting Transaction...",
  "Awaiting Confirmation...",
  "Payment Successful!"
];

export const PaymentModal: React.FC<PaymentModalProps> = ({ user, merchant, onClose, onPaymentSuccess }) => {
  const [amount, setAmount] = useState(10.00);
  const [stablecoin, setStablecoin] = useState<Stablecoin>(Stablecoin.USDC);
  const [network, setNetwork] = useState<Network>(Network.Polygon);
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setInterval> for browser compatibility.
    let interval: ReturnType<typeof setInterval>;
    if (processing && step < steps.length - 1) {
      interval = setInterval(() => {
        setStep(s => s + 1);
      }, 1000);
    } else if (step === steps.length - 1) {
      setTimeout(() => {
        const newTx = {
            id: `txn-${Math.random().toString(36).substring(2, 9)}`,
            userId: user.id,
            merchantId: merchant.id,
            amount: amount,
            stablecoin: stablecoin,
            network: network,
            status: TransactionStatus.Completed,
            timestamp: new Date().toISOString(),
            sanctionsCheck: 'Passed' as 'Passed',
        };
        onPaymentSuccess(newTx);
        onClose();
      }, 1000);
    }
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processing, step]);

  const handlePay = () => {
    setProcessing(true);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg shadow-xl p-8 w-full max-w-md text-text-primary">
        {!processing ? (
          <>
            <h2 className="text-2xl font-bold mb-1">Pay Merchant</h2>
            <p className="text-text-secondary mb-6">Paying: {merchant.name}</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-text-secondary mb-1">Amount (USD)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="w-full bg-background border border-border rounded-md px-3 py-2"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-secondary mb-1">Stablecoin</label>
              <select
                value={stablecoin}
                onChange={(e) => setStablecoin(e.target.value as Stablecoin)}
                className="w-full bg-background border border-border rounded-md px-3 py-2"
              >
                {Object.values(Stablecoin).map(sc => <option key={sc} value={sc}>{sc}</option>)}
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-secondary mb-1">Network</label>
              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value as Network)}
                className="w-full bg-background border border-border rounded-md px-3 py-2"
              >
                {Object.values(Network).map(net => <option key={net} value={net}>{net}</option>)}
              </select>
            </div>

            <p className="text-xs text-text-secondary mb-4 text-center">This is a simulation. A real implementation would connect to Metamask/WalletConnect here.</p>
            
            <div className="flex justify-end gap-4">
              <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500">Cancel</button>
              <button onClick={handlePay} className="px-4 py-2 rounded-md bg-primary hover:bg-blue-500 font-semibold">Pay ${amount.toFixed(2)}</button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold">{steps[step]}</h3>
            <p className="text-text-secondary mt-2">Please wait while we securely process your payment...</p>
          </div>
        )}
      </div>
    </div>
  );
};
