import React, { memo } from 'react';

const CryptoOverviewTableItem = memo((props) => {
  return (
    <tr>
      <td>{props.coinId}</td>
      <td
        className={`table__number-cell ${
          props.usdChange24h > 0
            ? 'table__number-cell--positive'
            : 'table__number-cell--negative'
        }`}
      >
        {`${props.usdChange24h.toFixed(2)}%`}
      </td>
      <td className="table__number-cell">{props.quantity.toFixed(2)}</td>
      <td className="table__number-cell">{props.currentPrice}</td>
      <td className="table__number-cell">{props.netInvestment.toFixed(2)}</td>
      <td className="table__number-cell">{props.currentValue.toFixed(2)}</td>
      <td
        className={`table__number-cell ${
          props.profitAndLoss > 0
            ? 'table__number-cell--positive'
            : 'table__number-cell--negative'
        }`}
      >
        {props.profitAndLoss.toFixed(2)}
      </td>
      <td
        className={`table__number-cell ${
          props.percentChange > 0
            ? 'table__number-cell--positive'
            : 'table__number-cell--negative'
        }`}
      >
        {props.percentChange ? `${props.percentChange.toFixed(2)}%` : ''}
      </td>
    </tr>
  );
});

export default CryptoOverviewTableItem;
