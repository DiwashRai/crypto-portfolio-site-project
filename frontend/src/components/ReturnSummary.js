import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTotalOriginalValue } from '../reducers/tradesReducer';
import { selectCryptoOverview } from '../selectors/cryptoOverviewSelector';

const ReturnSummary = () => {
  const totalOriginalValue = useSelector((state) =>
    selectTotalOriginalValue(state)
  );
  const cryptoOverview = useSelector((state) => selectCryptoOverview(state));
  const [totalCurrentValue, setTotalCurrentValue] = useState(0);

  useEffect(() => {
    if (cryptoOverview !== undefined) {
      setTotalCurrentValue(
        cryptoOverview.reduce((total, row) => total + row.currentValue, 0)
      );
    }
  }, cryptoOverview);

  return (
    <div className="ui-card">
      <div className="ui-card__title">
        <span>RETURN SUMMARY</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Total Original Value</th>
            <th>Total Current Value</th>
            <th>Total Value Change</th>
            <th>Percent Change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalOriginalValue.toFixed(2)}</td>
            <td className="table__number-cell">
              {cryptoOverview &&
                cryptoOverview
                  .reduce((total, row) => total + row.currentValue, 0)
                  .toFixed(2)}
            </td>
            <td>{totalCurrentValue}</td>
            <td>{'...'}</td>
          </tr>
        </tbody>
      </table>
      <div className="ui-card__content"></div>
    </div>
  );
};

export default ReturnSummary;
