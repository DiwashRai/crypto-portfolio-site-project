import React from 'react';
import { useSelector } from 'react-redux';
import { selectMarketData } from '../reducers/marketDataReducer';

const MarketTopList = () => {
  const marketData = useSelector((state) => selectMarketData(state));

  return (
    <div className="ui-card">
      <div className="ui-card__title">
        <span>MARKET SUMMARY</span>
      </div>
      <div className="ui-card__content">
        {marketData &&
          marketData.map((row) => (
            <div className="market-data-row">
              <div>
                <img src={row.image} height="20" />
              </div>
              <div>
                <span> {row.symbol.toUpperCase()}</span>
              </div>
              <div>
                <span> {row.current_price}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MarketTopList;
