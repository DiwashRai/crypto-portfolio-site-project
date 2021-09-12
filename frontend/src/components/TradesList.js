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
        <span>Trades Ledger</span>
      </div>
      <div className="ui-card__content">
        <div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Crypto</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Price</th>
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
