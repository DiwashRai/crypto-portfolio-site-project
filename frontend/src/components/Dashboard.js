import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startSetUser } from '../actions/userActions';
import { startSetPrices } from '../actions/pricesActions';
import ReturnSummary from './ReturnSummary';
import CryptoOverview from './CryptoOverview';
import TradesList from './TradesList';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startSetUser())
      .then((user) => {
        dispatch(startSetPrices(user.coinBalance.map((coin) => coin.coinId)));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="dashboard">
      <ReturnSummary />
      <CryptoOverview />
      <TradesList />
    </div>
  );
};

export default Dashboard;
