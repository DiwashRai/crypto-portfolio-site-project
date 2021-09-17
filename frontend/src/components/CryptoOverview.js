import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startSetUser } from '../actions/userActions';
import { selectCryptoOverview } from '../selectors/cryptoOverviewSelector';
import CryptoOverviewTableItem from './CryptoOverviewTableItem';

const CryptoOverview = () => {
  const overview = useSelector((state) => selectCryptoOverview(state));
  const dispatch = useDispatch();

  return (
    <div className="ui-card">
      <div className="ui-card__title">
        <span>CRYPTO OVERVIEW</span>
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
            {overview &&
              overview.map((row) => (
                <CryptoOverviewTableItem
                  key={row.coinId}
                  coinId={row.coinId}
                  trend={'_'}
                  quantity={row.quantity}
                  currentPrice={row.currentPrice}
                  netInvestment={0}
                  currentValue={row.currentValue}
                />
              ))}
          </tbody>
        </table>
        <button onClick={() => dispatch(startSetUser())}>refresh user</button>
      </div>
    </div>
  );
};

export default CryptoOverview;
