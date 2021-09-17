import { selectUser } from '../reducers/userReducer';
import { selectPrices } from '../reducers/pricesReducer';
import { createSelector } from 'reselect';

export const calcCryptoOverviewArr = (user, prices) => {
  if (user.coinBalance === undefined) return undefined;
  return user.coinBalance.map((coin) => {
    const priceData = prices[coin.coinId];
    const { coinId, quantity } = coin;
    return {
      coinId,
      quantity,
      currentPrice: priceData ? priceData.usd : 0,
      currentValue: priceData ? quantity * priceData.usd : 0,
    };
  });
};

export const selectCryptoOverview = createSelector(
  selectUser,
  selectPrices,
  (user, prices) => calcCryptoOverviewArr(user, prices)
);
