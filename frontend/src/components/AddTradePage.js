import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TradeForm from './TradeForm';
import { startAddTrade } from '../actions/tradesActions';

const AddTradePage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authentication);
  const history = useHistory();

  return (
    <div>
      <h1>Add Trade</h1>
      <TradeForm
        onSubmit={(trade) => {
          dispatch(startAddTrade(trade, auth.accessToken));
          history.push('/dashboard');
        }}
      />
    </div>
  );
};

export default AddTradePage;
