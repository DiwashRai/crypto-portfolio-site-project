import React from 'react';
import { useSelector } from 'react-redux';

const ReturnSummary = () => {
  const user = useSelector((state) => state.user);
  const prices = useSelector((state) => state.prices);
  const trades = useSelector((state) => state.trades);

  const getTotalOriginalvalue = () => {
    let total = 0;
    trades.forEach((trade) => {
      total += trade.total;
    });
    return total;
  };
  const getTotalCurrentValue = () => {
    let total = 0;
    user.coinBalance.forEach((coin) => {
      const priceData = prices[coin.coinId];
      if (priceData) {
        total += coin.quantity * priceData.usd;
      }
    });
    return total;
  };

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
            <td>{getTotalOriginalvalue().toFixed(2)}</td>
            <td className="table__number-cell">
              {user.coinBalance && getTotalCurrentValue().toFixed(2)}
            </td>
            <td>{'...'}</td>
            <td>{'...'}</td>
          </tr>
        </tbody>
      </table>
      <div className="ui-card__content"></div>
    </div>
  );
};

export default ReturnSummary;
