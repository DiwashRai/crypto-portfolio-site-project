import React from 'react';
import UserBalanceList from './UserBalanceList';
import TradesList from './TradesList';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <UserBalanceList />
      <TradesList />
    </div>
  );
};

export default Dashboard;
