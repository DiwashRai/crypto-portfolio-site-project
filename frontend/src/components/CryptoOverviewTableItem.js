import React from 'react';

const CryptoOverviewTableItem = (props) => {
  return (
    <tr>
      <td>{props.coinId}</td>
      <td>{props.trend}</td>
      <td className="table__number-cell">{props.daily}</td>
      <td className="table__number-cell">{props.weekly}</td>
      <td className="table__number-cell">{props.quantity.toFixed(2)}</td>
      <td className="table__number-cell">{props.currentPrice}</td>
      <td className="table__number-cell">{props.netInvestment}</td>
      <td className="table__number-cell">{props.currentValue}</td>
    </tr>
  );
};

export default CryptoOverviewTableItem;
