import React from 'react';
import { useSelector } from 'react-redux';
import { selectCryptoOverview } from '../selectors/cryptoOverviewSelector';
import CryptoOverviewTableItem from './CryptoOverviewTableItem';

const CryptoOverview = () => {
  const overview = useSelector((state) => selectCryptoOverview(state));

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
              <th className="table__number-cell">24h%</th>
              <th className="table__number-cell">Quantity</th>
              <th className="table__number-cell">Current Price</th>
              <th className="table__number-cell">Net Investment</th>
              <th className="table__number-cell">Current Value</th>
              <th className="table__number-cell">Profit/Loss</th>
              <th className="table__number-cell">% Change</th>
            </tr>
          </thead>
          <tbody>
            {overview &&
              overview.map((row) => (
                <CryptoOverviewTableItem
                  key={row.coinId}
                  coinId={row.coinId}
                  quantity={row.quantity}
                  usdChange24h={row.usdChange24h}
                  currentPrice={row.currentPrice}
                  netInvestment={row.netInvestment}
                  currentValue={row.currentValue}
                  profitAndLoss={row.currentValue - row.netInvestment}
                  percentChange={
                    row.netInvestment > 0
                      ? ((row.currentValue - row.netInvestment) /
                          row.netInvestment) *
                        100
                      : undefined
                  }
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoOverview;
