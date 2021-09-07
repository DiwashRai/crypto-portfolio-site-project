import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { startSetUser } from '../actions/userActions';
import { startSetPrices } from '../actions/pricesActions';
import UserBalanceListItem from './UserBalanceListItem';

const UserBalanceList = (props) => {
  const [accountValue, setAccountValue] = useState(0);

  useEffect(() => {
    props.dispatch(startSetUser());
    props.dispatch(startSetPrices());
  }, []);

  useEffect(() => {
    if (Object.keys(props.prices).length === 0) {
      return;
    }

    let total = 0;
    props.user.balance.forEach((item) => {
      switch (item.symbol) {
        case 'USD':
          total += item.quantity;
          break;
        case 'BTC':
          total += item.quantity * props.prices.bitcoin.usd;
          break;
        case 'ETH':
          total += item.quantity * props.prices.ethereum.usd;
          break;
        case 'ADA':
          total += item.quantity * props.prices.cardano.usd;
          break;
      }
      setAccountValue(total);
    });
  }, [props.prices, props.user.balance]);

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          props.dispatch(startSetPrices());
        }}
      >
        Refresh
      </button>
      <h3>Account Value</h3>
      <p>{accountValue}</p>
      <h3>Balance</h3>
      {props.user.balance &&
        props.user.balance.map((coin) => (
          <UserBalanceListItem
            key={coin.symbol}
            symbol={coin.symbol}
            quantity={coin.quantity}
          />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    prices: state.prices,
  };
};

export default connect(mapStateToProps)(UserBalanceList);
