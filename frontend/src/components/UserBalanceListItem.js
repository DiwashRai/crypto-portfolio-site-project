import React from 'react';

const UserBalanceListItem = (props) => {
  return (
    <div>
      <p>
        {props.symbol} - {props.quantity}
      </p>
    </div>
  );
};

export default UserBalanceListItem;
