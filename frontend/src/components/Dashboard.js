import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSetUser } from '../actions/userActions';
import { startSetPrices } from '../actions/pricesActions';
import { startSetTrades } from '../actions/tradesActions';
import ReturnSummary from './ReturnSummary';
import CryptoOverview from './CryptoOverview';
import TradesList from './TradesList';

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(startSetUser(auth.accessToken))
      .then((user) => {
        dispatch(startSetPrices(user.coinBalance.map((coin) => coin.coinId)));
        dispatch(startSetTrades(auth.accessToken));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth.accessToken]);

  return (
    <div className="dashboard">
      <ReturnSummary />
      <CryptoOverview />
      <TradesList />
    </div>
  );
};

export default Dashboard;
