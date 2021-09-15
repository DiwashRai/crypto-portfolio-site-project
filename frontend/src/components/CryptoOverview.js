import React from 'react';
import { connect } from 'react-redux';
import CryptoOverviewTableItem from './CryptoOverviewTableItem';

const CryptoOverview = (props) => {
  const getCryptoOverviewTableItem = (coin) => {
    return (
      <CryptoOverviewTableItem
        key={coin.coinId}
        coinId={coin.coinId}
        trend={'-'}
        daily={'0'}
        weekly={'0'}
        quantity={coin.quantity}
        currentPrice={
          props.prices[coin.coinId]
            ? props.prices[coin.coinId].usd
            : 'loading...'
        }
      />
    );
  };

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
              <th className="table__number-cell">24h%</th>
              <th className="table__number-cell">7d%</th>
              <th className="table__number-cell">Quantity</th>
              <th className="table__number-cell">Current Price</th>
            </tr>
          </thead>
          <tbody>
            {props.user.coinBalance &&
              props.user.coinBalance.map((coin) =>
                getCryptoOverviewTableItem(coin)
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    prices: state.prices,
  };
};

export default connect(mapStateToProps)(CryptoOverview);
