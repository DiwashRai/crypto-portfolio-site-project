import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startSetTrades } from '../actions/tradesActions';
import TradesListItem from './TradesListItem';

const TradesList = () => {
  const trades = useSelector((state) => state.trades);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startSetTrades());
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
              {trades.map((trade) => (
                <TradesListItem key={trade._id} trade={trade} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TradesList;
