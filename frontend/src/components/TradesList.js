import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { startSetTrades } from '../actions/tradesActions';
import TradesListItem from './TradesListItem';

const TradesList = (props) => {
  useEffect(() => {
    props.dispatch(startSetTrades());
  }, []);

  return (
    <div className="ui-card">
      <div className="ui-card__title">
        <span>TRADES LEDGER</span>
      </div>
      <div className="ui-card__content">
        <div>
          <table>
            <thead>
              <tr>
                <th className="table__edit-cell"></th>
                <th>Date</th>
                <th>Crypto</th>
                <th className="table__number-cell">Quantity</th>
                <th className="table__number-cell">Total</th>
                <th className="table__number-cell">Price</th>
              </tr>
            </thead>
            <tbody>
              {props.trades.map((trade) => (
                <TradesListItem key={trade._id} trade={trade} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    trades: state.trades,
  };
};

export default connect(mapStateToProps)(TradesList);
