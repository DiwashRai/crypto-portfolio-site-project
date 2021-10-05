import axios from '../helpers/axios';

export const setPrices = (prices) => ({
  type: 'SET_PRICES',
  prices,
});

export const startSetPrices = (coinIdArr) => {
  return (dispatch) => {
    let idsValue = '';
    coinIdArr.forEach((coinId) => {
      idsValue += coinId + ',';
    });
    const geckoURL = `https://api.coingecko.com/api/v3/simple/price?ids=${idsValue}&vs_currencies=usd&include_24hr_change=true`;
    axios
      .get(geckoURL)
      .then((response) => {
        dispatch(setPrices(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setMarketData = (marketData) => ({
  type: 'SET_MARKET_DATA',
  marketData,
});

export const startSetMarketData = () => {
  return (_dispatch) => {
    const geckoURL =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h%2C7d';
    return axios
      .get(geckoURL)
      .then((response) => {
        console.log(response.data());
      })
      .catch((err) => {
        cosole.log(err);
      });
  };
};
