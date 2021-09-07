import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { startSetTrades } from '../actions/tradesActions';
import TradesListItem from './TradesListItem';

const TradesList = (props) => {
  useEffect(() => {
    props.dispatch(startSetTrades());
  }, []);

  return (
    <div>
      <h3>Trades</h3>
      {props.trades.map((trade) => (
        <TradesListItem key={trade._id} trade={trade} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    trades: state.trades,
  };
};

export default connect(mapStateToProps)(TradesList);
