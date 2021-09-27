import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTotalOriginalValue } from '../reducers/tradesReducer';
import { selectCryptoOverview } from '../selectors/cryptoOverviewSelector';
import { toUSD } from '../helpers/formatting';

const ReturnSummary = () => {
  const totalOriginalValue = useSelector((state) =>
    selectTotalOriginalValue(state)
  );
  const cryptoOverview = useSelector((state) => selectCryptoOverview(state));
  const [totalCurrentValue, setTotalCurrentValue] = useState(0);
  const [totalValueChange, setTotalValueChange] = useState(0);
  const [percentChange, setPercentChange] = useState(0);

  useEffect(() => {
    if (cryptoOverview === undefined) return;
    setTotalCurrentValue(
      cryptoOverview.reduce((total, row) => total + row.currentValue, 0)
    );
  }, [cryptoOverview]);

  useEffect(() => {
    if (totalOriginalValue === 0) return;
    setPercentChange((totalCurrentValue / totalOriginalValue - 1) * 100);
    setTotalValueChange(totalCurrentValue - totalOriginalValue);
  }, [totalCurrentValue, totalOriginalValue]);

  return (
    <div className="ui-card">
      <div className="ui-card__title">
        <span>RETURN SUMMARY</span>
      </div>
      <table>
        <thead>
          <tr>
            <th className="table__number-cell">Total Original Value</th>
            <th className="table__number-cell">Total Current Value</th>
            <th className="table__number-cell">Total Value Change</th>
            <th className="table__number-cell">Percent Change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table__number-cell">{toUSD(totalOriginalValue)}</td>
            <td className="table__number-cell">{toUSD(totalCurrentValue)}</td>
            <td
              className={`table__number-cell ${
                totalValueChange > 0
                  ? 'table__number-cell--positive'
                  : 'table__number-cell--negative'
              }`}
            >
              {toUSD(totalValueChange)}
            </td>
            <td
              className={`table__number-cell ${
                percentChange > 0
                  ? 'table__number-cell--positive'
                  : 'table__number-cell--negative'
              }`}
            >
              {`${percentChange.toFixed(2)}%`}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="ui-card__content"></div>
    </div>
  );
};

export default ReturnSummary;
