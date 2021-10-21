import React from 'react';
import { useSelector } from 'react-redux';
import { selectMarketData } from '../reducers/marketDataReducer';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const MarketTopList = () => {
  const marketData = useSelector((state) => selectMarketData(state));

  return (
    <div className="ui-card">
      <div className="ui-card__title">
        <span>MARKET SUMMARY</span>
      </div>
      <div className="ui-card__content">
        {marketData &&
          marketData.slice(0, 10).map((row) => (
            <div className="market-data-row">
              <div>
                <img src={row.image} height="30" />
              </div>
              <div>
                <span> {row.symbol.toUpperCase()}</span>
              </div>
              <div>
                <span> {'$' + row.current_price}</span>
              </div>
              <div className="chart">
                <Sparklines
                  data={row.sparkline_in_7d.price}
                  svgHeight={50}
                  svgWidth={120}
                >
                  <SparklinesLine color="blue" />
                </Sparklines>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MarketTopList;
