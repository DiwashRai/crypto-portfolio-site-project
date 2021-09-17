import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TradeListItem = memo((props) => {
  return (
    <tr>
      <td className="table__edit-cell">
        <Link to={`/edit/${props.tradeId}`}>edit</Link>
      </td>
      <td>{moment(props.tradeDate).format('Do MMM YYYY')}</td>
      <td>{props.coinId}</td>
      <td className="table__number-cell">{props.quantity.toFixed(2)}</td>
      <td className="table__number-cell">{props.total.toFixed(2)}</td>
      <td className="table__number-cell">{props.price.toFixed(2)}</td>
    </tr>
  );
});

export default TradeListItem;
