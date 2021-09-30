import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TradeForm from './TradeForm';
import { startAddTrade } from '../actions/tradesActions';

const AddTradePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div>
      <h1>Add Trade</h1>
      <TradeForm
        onSubmit={(trade) => {
          dispatch(startAddTrade(trade));
          history.push('/dashboard');
        }}
      />
    </div>
  );
};

export default AddTradePage;
