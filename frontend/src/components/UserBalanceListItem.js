import React from 'react';

const UserBalanceListItem = (props) => {
  return (
    <div>
      <p>
        {props.coinId} - {props.quantity}
      </p>
    </div>
  );
};

export default UserBalanceListItem;
