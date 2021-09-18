import { selectUser } from '../reducers/userReducer';
import { selectPrices } from '../reducers/pricesReducer';
import { selectNetInvestmentsByCoinId } from '../reducers/tradesReducer';
import { createSelector } from 'reselect';

export const calcCryptoOverviewArr = (user, prices, netInvestmentByCoinId) => {
  if (user.coinBalance === undefined) return undefined;
  return user.coinBalance.map((coin) => {
    const priceData = prices[coin.coinId];
    const { coinId, quantity } = coin;
    return {
      coinId,
      quantity,
      usdChange24h: priceData ? priceData.usd_24h_change : 0,
      netInvestment: netInvestmentByCoinId[coinId]
        ? netInvestmentByCoinId[coinId]
        : 0,
      currentPrice: priceData ? priceData.usd : 0,
      currentValue: priceData ? quantity * priceData.usd : 0,
    };
  });
};

export const selectCryptoOverview = createSelector(
  selectUser,
  selectPrices,
  selectNetInvestmentsByCoinId,
  (user, prices, netInvestments) =>
    calcCryptoOverviewArr(user, prices, netInvestments)
);
