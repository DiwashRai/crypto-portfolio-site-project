import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TradeListItem = (props) => {
  return (
    <tr>
      <td>
        <Link to={`/edit/${props.trade._id}`}>edit</Link>
      </td>
      <td>{moment(props.trade.tradeDate).format('Do MMM YYYY')}</td>
      <td>{props.trade.coinId}</td>
      <td>{props.trade.quantity.toFixed(2)}</td>
      <td>{props.trade.total.toFixed(2)}</td>
      <td>{props.trade.price.toFixed(2)}</td>
    </tr>
  );
};

export default TradeListItem;
