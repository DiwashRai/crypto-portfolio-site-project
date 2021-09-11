import React from 'react';
import { connect } from 'react-redux';
import TradeForm from './TradeForm';
import { startEditTrade, startDeleteTrade } from '../actions/tradesActions';

const EditTradePage = (props) => {
  const onSubmitEdit = (trade) => {
    props.dispatch(startEditTrade(props.trade._id, trade));
    props.history.push('/dashboard');
  };

  const onDelete = () => {
    props.dispatch(startDeleteTrade(props.trade._id));
    props.history.push('/dashboard');
  };

  return (
    <div>
      <h1>Edit Trade</h1>
      <TradeForm trade={props.trade} onSubmit={onSubmitEdit} />
      <button onClick={onDelete}>Delete Trade</button>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  trade: state.trades.find((trade) => trade._id === props.match.params.id),
});

export default connect(mapStateToProps)(EditTradePage);
