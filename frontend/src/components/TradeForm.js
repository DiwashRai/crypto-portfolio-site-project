import React, { useState } from 'react';

const TradeForm = (props) => {
  const [tradeDate, setTradeDate] = useState(() =>
    props.trade.tradeDate ? props.trade.tradeDate : ''
  );
  const [coinId, setCoinId] = useState(() =>
    props.trade.coinId ? props.trade.coinId : ''
  );
  const [quantity, setQuantity] = useState(() =>
    props.trade.quantity ? props.trade.quantity : ''
  );
  const [cost, setCost] = useState(() =>
    props.trade.cost ? props.trade.cost : ''
  );
  const [fee, setFee] = useState(() =>
    props.trade.fee ? props.trade.fee : ''
  );
  const [error, setError] = useState('');

  const onTradeDateChange = (e) => {
    setTradeDate(e.target.value);
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
        tradeDate,
        coinId,
        quantity,
        cost,
        fee,
      });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="TradeDate"
          value={tradeDate}
          onChange={onTradeDateChange}
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
