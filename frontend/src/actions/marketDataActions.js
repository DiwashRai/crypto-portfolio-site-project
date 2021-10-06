import axios from '../helpers/axios';

export const setMarketData = (marketData) => ({
  type: 'SET_MARKET_DATA',
  marketData,
});

export const startSetMarketData = () => {
  return (dispatch) => {
    const geckoURL =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h%2C7d';
    return axios
      .get(geckoURL)
      .then((response) => {
        dispatch(setMarketData(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
