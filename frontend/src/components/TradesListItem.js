import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TradeListItem = (props) => {
  return (
    <tr>
      <td className="table__edit-cell">
        <Link to={`/edit/${props.trade._id}`}>edit</Link>
      </td>
      <td>{moment(props.trade.tradeDate).format('Do MMM YYYY')}</td>
      <td>{props.trade.coinId}</td>
      <td className="table__number-cell">{props.trade.quantity.toFixed(2)}</td>
      <td className="table__number-cell">{props.trade.total.toFixed(2)}</td>
      <td className="table__number-cell">{props.trade.price.toFixed(2)}</td>
    </tr>
  );
};

export default TradeListItem;
