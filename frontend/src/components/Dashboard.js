import React from 'react';
import CryptoOverview from './CryptoOverview';
import UserBalanceList from './UserBalanceList';
import TradesList from './TradesList';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <CryptoOverview />
      <TradesList />
    </div>
  );
};

export default Dashboard;
