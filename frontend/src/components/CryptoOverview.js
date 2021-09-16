import React from 'react';
import { useSelector } from 'react-redux';
import CryptoOverviewTableItem from './CryptoOverviewTableItem';

const CryptoOverview = () => {
  const user = useSelector((state) => state.user);
  const prices = useSelector((state) => state.prices);

  const getCryptoOverviewTableItem = (coin) => {
    coin.currentValue = 0;
    const priceData = prices[coin.coinId];
    if (priceData) {
      coin.currentValue = coin.quantity * priceData.usd;
    }

    return (
      <CryptoOverviewTableItem
        key={coin.coinId}
        coinId={coin.coinId}
        trend={'-'}
        daily={'0'}
        weekly={'0'}
        quantity={coin.quantity}
        currentPrice={priceData ? priceData.usd : 'loading...'}
        netInvestment={'0'}
        currentValue={coin.currentValue.toFixed(2)}
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
              <th className="table__number-cell">Net Investment</th>
              <th className="table__number-cell">Current Value</th>
            </tr>
          </thead>
          <tbody>
            {user.coinBalance &&
              user.coinBalance.map((coin) => getCryptoOverviewTableItem(coin))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoOverview;
