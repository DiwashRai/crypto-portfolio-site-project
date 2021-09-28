import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTotalOriginalValue } from '../reducers/tradesReducer';
import { selectCryptoOverview } from '../selectors/cryptoOverviewSelector';
import { toUSD } from '../helpers/formatting';

const ReturnSummary = () => {
  const totalOriginalValue = useSelector((state) =>
    selectTotalOriginalValue(state)
  );
  const cryptoOverview = useSelector((state) => selectCryptoOverview(state));
  const [totalCurrentValue, setTotalCurrentValue] = useState(0);
  const [totalValueChange, setTotalValueChange] = useState(0);
  const [percentChange, setPercentChange] = useState(0);

  useEffect(() => {
    if (cryptoOverview === undefined) return;
    setTotalCurrentValue(
      cryptoOverview.reduce((total, row) => total + row.currentValue, 0)
    );
  }, [cryptoOverview]);

  useEffect(() => {
    if (totalOriginalValue === 0) return;
    setPercentChange((totalCurrentValue / totalOriginalValue - 1) * 100);
    setTotalValueChange(totalCurrentValue - totalOriginalValue);
  }, [totalCurrentValue, totalOriginalValue]);

  return (
    <div className="ui-card">
      <div className="ui-card__title">
        <span>RETURN SUMMARY</span>
      </div>
      <div className="ui-card__content">
        <div className="details">
          <div className="details__row">
            <div>Total Original Value</div>
            <div>{toUSD(totalOriginalValue)}</div>
          </div>
          <div className="details__row">
            <div>Total Current Value</div>
            <div>{toUSD(totalCurrentValue)}</div>
          </div>
          <hr />
          <div className="details__row">
            <div>Total Value Change</div>
            <div
              className={`${
                totalValueChange > 0
                  ? 'details__row__value--positive'
                  : 'details__row__value--negative'
              }`}
            >
              {toUSD(totalValueChange)}
            </div>
          </div>
          <div className="details__row">
            <div>Percent Change</div>
            <div
              className={`${
                percentChange > 0
                  ? 'details__row__value--positive'
                  : 'details__row__value--negative'
              }`}
            >{`${percentChange.toFixed(2)}%`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnSummary;
