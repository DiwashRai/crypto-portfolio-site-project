import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { startSetUser } from '../actions/userActions';
import { startSetPrices } from '../actions/pricesActions';
import CryptoOverview from './CryptoOverview';
import TradesList from './TradesList';

const Dashboard = (props) => {
  useEffect(() => {
    props.dispatch(startSetUser()).then((user) => {
      props.dispatch(
        startSetPrices(user.coinBalance.map((coin) => coin.coinId))
      );
    });
  }, []);

  return (
    <div className="dashboard">
      <CryptoOverview />
      <TradesList />
    </div>
  );
};

export default connect()(Dashboard);
