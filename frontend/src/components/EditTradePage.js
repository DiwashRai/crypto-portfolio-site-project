import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TradeForm from './TradeForm';
import { selectTradeById } from '../reducers/tradesReducer';
import { startEditTrade, startDeleteTrade } from '../actions/tradesActions';

const EditTradePage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.authentication);
  const trade = useSelector((state) =>
    selectTradeById(state, props.match.params.id)
  );

  const onSubmitEdit = (tradeData) => {
    dispatch(startEditTrade(trade._id, tradeData, auth.accessToken));
    history.push('/dashboard');
  };

  const onDelete = () => {
    dispatch(startDeleteTrade(trade._id, auth.accessToken));
    history.push('/dashboard');
  };

  return (
    <div>
      <h1>Edit Trade</h1>
      <TradeForm trade={trade} onSubmit={onSubmitEdit} />
      <button onClick={onDelete}>Delete Trade</button>
    </div>
  );
};

export default EditTradePage;
