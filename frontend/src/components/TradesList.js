import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTrades } from '../reducers/tradesReducer';
import { startSetTrades } from '../actions/tradesActions';
import TradesListItem from './TradesListItem';

const TradesList = () => {
  const trades = useSelector((state) => selectTrades(state));
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
                <TradesListItem
                  key={trade._id}
                  tradeId={trade._id}
                  coinId={trade.coinId}
                  tradeDate={trade.tradeDate}
                  quantity={trade.quantity}
                  total={trade.total}
                  price={trade.price}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TradesList;
