// SET_TRADES
export const setTrades = (trades) => ({
  type: 'SET_TRADES',
  trades,
});

export const startSetTrades = () => {
  return (dispatch) => {
    const config = {
      method: 'GET',
      credentials: 'include',
    };

    fetch(`${REACT_APP_API_URL}/trades`, config)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Unable to GET /trades');
        }
        return response.json();
      })
      .then((trades) => {
        dispatch(setTrades(trades));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
