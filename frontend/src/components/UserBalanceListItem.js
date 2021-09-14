import React from 'react';

const UserBalanceListItem = (props) => {
  return (
    <tr>
      <td>{props.coinId}</td>
      <td>{props.quantity}</td>
    </tr>
  );
};

export default UserBalanceListItem;
