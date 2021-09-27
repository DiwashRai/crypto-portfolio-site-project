import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toUSD } from '../helpers/formatting';

const TradeListItem = memo((props) => {
  return (
    <tr>
      <td className="table__edit-cell">
        <Link to={`/edit/${props.tradeId}`}>edit</Link>
      </td>
      <td>{moment(props.tradeDate).format('Do MMM YYYY')}</td>
      <td>{props.coinId}</td>
      <td className="table__number-cell">{props.quantity.toFixed(2)}</td>
      <td className="table__number-cell">{toUSD(props.total)}</td>
      <td className="table__number-cell">{toUSD(props.price)}</td>
    </tr>
  );
});

export default TradeListItem;
