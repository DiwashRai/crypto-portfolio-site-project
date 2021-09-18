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
