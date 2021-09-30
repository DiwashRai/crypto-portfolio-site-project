import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toUSD } from '../helpers/formatting';
import { startSetTrades, startDeleteTrade } from '../actions/tradesActions';

const TradeListItem = memo((props) => {
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(startDeleteTrade(props.tradeId))
      .then((_trade) => {
        dispatch(startSetTrades());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr>
      <td className="table__edit-cell">
        <Link to={`/edit/${props.tradeId}`}>edit</Link>
        <i className="material-icons md-18" id="editTrade">
          edit
        </i>
      </td>
      <td>{moment(props.tradeDate).format('Do MMM YYYY')}</td>
      <td>{props.coinId}</td>
      <td className="table__number-cell">{props.quantity.toFixed(2)}</td>
      <td className="table__number-cell">{toUSD(props.total)}</td>
      <td className="table__number-cell">{toUSD(props.price)}</td>
      <td className="table__icon-cell">
        <i className="material-icons md-18" id="deleteTrade" onClick={onDelete}>
          delete_forever
        </i>
      </td>
    </tr>
  );
});

export default TradeListItem;
