import React from 'react';
import UserBalanceList from './UserBalanceList';
import TradesList from './TradesList';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <UserBalanceList />
      <TradesList />
    </div>
  );
};

export default Dashboard;
