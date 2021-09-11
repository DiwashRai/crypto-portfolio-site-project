import React from 'react';
import { connect } from 'react-redux';
import TradeForm from './TradeForm';
import { startAddTrade } from '../actions/tradesActions';

const AddTradePage = (props) => (
  <div>
    <h1>Add trade</h1>
    <TradeForm
      onSubmit={(trade) => {
        props.dispatch(startAddTrade(trade));
        props.history.push('/dashboard');
      }}
    />
  </div>
);

export default connect()(AddTradePage);
