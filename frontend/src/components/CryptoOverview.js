import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { startSetUser } from '../actions/userActions';
import { startSetPrices } from '../actions/pricesActions';
import CryptoOverviewTableItem from './CryptoOverviewTableItem';

const CryptoOverview = (props) => {
  useEffect(() => {
    props.dispatch(startSetUser()).then((user) => {
      props.dispatch(
        startSetPrices(user.coinBalance.map((coin) => coin.coinId))
      );
    });
  }, []);

  return (
    <div className="ui-card">
      <div className="ui-card__title">
        <span>COIN OVERVIEW</span>
      </div>
      <div className="ui-card__content">
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Trend</th>
              <th>24h%</th>
              <th>7d%</th>
              <th>Quantity</th>
              <th>Current Price</th>
            </tr>
          </thead>
          <tbody>
            {props.user.coinBalance &&
              props.user.coinBalance.map((coin) => (
                <CryptoOverviewTableItem
                  key={coin.coinId}
                  coinId={coin.coinId}
                  trend={'-'}
                  daily={'0'}
                  weekly={'0'}
                  currentPrice={'-'}
                  quantity={coin.quantity}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(CryptoOverview);
