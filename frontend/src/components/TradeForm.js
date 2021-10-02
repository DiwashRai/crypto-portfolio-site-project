import React, { useState } from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const TradeForm = (props) => {
  const [tradeDate, setTradeDate] = useState(() =>
    props.trade ? moment(props.trade.tradeDate) : moment()
  );
  const [coinId, setCoinId] = useState(() =>
    props.trade ? props.trade.coinId : ''
  );
  const [quantity, setQuantity] = useState(() =>
    props.trade ? props.trade.quantity : ''
  );
  const [cost, setCost] = useState(() => (props.trade ? props.trade.cost : ''));
  const [fee, setFee] = useState(() => (props.trade ? props.trade.fee : ''));
  const [calendarFocused, setCalendarFocused] = useState(false);

  const [error, setError] = useState('');

  const onTradeDateChange = (tradeDate) => {
    setTradeDate(tradeDate);
  };

  const onFocusChange = ({ focused }) => {
    setCalendarFocused(focused);
  };

  const onCoinIdChange = (e) => {
    const coinId = e.target.value;
    if (!coinId || coinId.match(/^[a-z]+$/)) {
      setCoinId(coinId);
    }
  };

  const onQuantityChange = (e) => {
    const quantity = e.target.value;
    if (!quantity || quantity.match(/^\d{1,}(\.\d{0,8})?$/)) {
      setQuantity(e.target.value);
    }
  };

  const onCostChange = (e) => {
    const cost = e.target.value;
    if (!cost || cost.match(/^\d{1,}(\.\d{0,8})?$/)) {
      setCost(cost);
    }
  };

  const onFeeChange = (e) => {
    const fee = e.target.value;
    if (!fee || fee.match(/^\d{1,}(\.\d{0,8})?$/)) {
      setFee(fee);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!tradeDate || !coinId || !quantity || !cost) {
      setError('TradeDate, CoinID, Quantity and Cost are mandatory fields.');
    } else {
      setError('');
      props.onSubmit({
        tradeDate: tradeDate.toISOString(),
        coinId,
        quantity: parseFloat(quantity),
        cost: parseFloat(cost),
        fee: parseFloat(fee),
      });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {error && <p>{error}</p>}
        <SingleDatePicker
          date={tradeDate}
          onDateChange={onTradeDateChange}
          focused={calendarFocused}
          onFocusChange={onFocusChange}
          id="trade_form_date_picker"
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <input
          type="text"
          placeholder="Coin ID"
          value={coinId}
          onChange={onCoinIdChange}
        />
        <input
          type="text"
          placeholder="Quantity"
          value={quantity}
          onChange={onQuantityChange}
        />
        <input
          type="text"
          placeholder="Cost"
          value={cost}
          onChange={onCostChange}
        />
        <input
          type="text"
          placeholder="Fee"
          value={fee}
          onChange={onFeeChange}
        />
        <button>Save Trade</button>
      </form>
    </div>
  );
};

export default TradeForm;
