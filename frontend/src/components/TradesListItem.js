import React from 'react';
import { Link } from 'react-router-dom';

const TradeListItem = (props) => {
  return (
    <Link to={`/edit/${props.trade._id}`}>
      <div>
        <p>Trade Date: {props.trade.tradeDate}</p>
        <p>
          Symbol: {props.trade.coinId} Quantity: {props.trade.quantity} Total:
          {props.trade.total} Price: {props.trade.price}
        </p>
      </div>
    </Link>
  );
};

export default TradeListItem;
