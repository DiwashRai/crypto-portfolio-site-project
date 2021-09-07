export const setPrices = (prices) => ({
  type: 'SET_PRICES',
  prices,
});

export const startSetPrices = () => {
  return (dispatch) => {
    const geckoURL =
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,polkadot&vs_currencies=usd';
    fetch(geckoURL)
      .then((response) => {
        return response.json();
      })
      .then((prices) => {
        dispatch(setPrices(prices));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
