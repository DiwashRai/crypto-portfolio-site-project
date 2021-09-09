import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { startSetUser } from '../actions/userActions';
import { startSetPrices } from '../actions/pricesActions';
import UserBalanceListItem from './UserBalanceListItem';

const UserBalanceList = (props) => {
  const [accountValue, setAccountValue] = useState(0);

  useEffect(() => {
    props.dispatch(startSetUser()).then((user) => {
      props.dispatch(
        startSetPrices(user.coinBalance.map((coin) => coin.coinId))
      );
    });
  }, []);

  useEffect(() => {
    if (Object.keys(props.prices).length === 0) {
      return;
    }

    const usdBalance = props.user.currencyBalance.find(
      (currency) => currency.currencySymbol === 'usd'
    );
    let total = usdBalance.quantity;
    props.user.coinBalance.forEach((coin) => {
      total += coin.quantity * props.prices[coin.coinId].usd;
    });
    setAccountValue(total);
  }, [props.prices, props.user.coinBalance]);

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          props.dispatch(
            startSetPrices(props.user.coinBalance.map((coin) => coin.coinId))
          );
        }}
      >
        Refresh
      </button>
      <h3>Account Value</h3>
      <p>{accountValue}</p>
      <h3>Balance</h3>
      {props.user.currencyBalance && (
        <p>
          USD -{' '}
          {
            props.user.currencyBalance.find(
              (currency) => currency.currencySymbol === 'usd'
            ).quantity
          }
        </p>
      )}
      {props.user.coinBalance &&
        props.user.coinBalance.map((coin) => (
          <UserBalanceListItem
            key={coin.coinId}
            coinId={coin.coinId}
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
