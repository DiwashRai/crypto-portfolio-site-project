import React from 'react';

const TradeListItem = (props) => {
  return (
    <div>
      <p>Trade Date: {props.trade.tradeDate}</p>
      <p>
        Symbol: {props.trade.symbol} Quantity: {props.trade.quantity} Total:
        {props.trade.total} Price: {props.trade.price}
      </p>
    </div>
  );
};

export default TradeListItem;
