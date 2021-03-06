import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSetUser } from '../actions/userActions';
import { startSetMarketData } from '../actions/marketDataActions';
import { startSetPrices } from '../actions/pricesActions';
import { startSetTrades } from '../actions/tradesActions';
import ReturnSummary from './ReturnSummary';
import MarketTopList from './MarketTopList';
import CryptoOverview from './CryptoOverview';
import TradesList from './TradesList';

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(startSetMarketData());
  }, []);

  useEffect(() => {
    dispatch(startSetUser())
      .then((user) => {
        dispatch(startSetPrices(user.coinBalance.map((coin) => coin.coinId)));
        dispatch(startSetTrades());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth.accessToken]);

  return (
    <div className="dashboard">
      <div className="dashboard__left-side">
        <ReturnSummary />
        <MarketTopList />
      </div>
      <div className="dashboard__center">
        <CryptoOverview />
        <TradesList />
      </div>
    </div>
  );
};

export default Dashboard;
