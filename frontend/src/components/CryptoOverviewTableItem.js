import React, { memo } from 'react';
import { toUSD } from '../helpers/formatting';

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
      <td className="table__number-cell">{toUSD(props.currentPrice)}</td>
      <td className="table__number-cell">{toUSD(props.netInvestment)}</td>
      <td className="table__number-cell">{toUSD(props.currentValue)}</td>
      <td
        className={`table__number-cell ${
          props.profitAndLoss > 0
            ? 'table__number-cell--positive'
            : 'table__number-cell--negative'
        }`}
      >
        {toUSD(props.profitAndLoss)}
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
