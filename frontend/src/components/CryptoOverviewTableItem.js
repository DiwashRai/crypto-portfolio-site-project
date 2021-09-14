import React from 'react';

const CryptoOverviewTableItem = (props) => {
  return (
    <tr>
      <td>{props.coinId}</td>
      <td>{props.trend}</td>
      <td>{props.daily}</td>
      <td>{props.weekly}</td>
      <td>{props.quantity}</td>
      <td>{props.currentPrice}</td>
    </tr>
  );
};

export default CryptoOverviewTableItem;
