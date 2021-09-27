import axios from '../helpers/axios';

// SET_TRADES
export const setTrades = (trades) => ({
  type: 'SET_TRADES',
  trades,
});

export const startSetTrades = (accessToken) => {
  return (dispatch) => {
    return axios
      .get(`${REACT_APP_API_URL}/trades`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        const trades = response.data;
        dispatch(setTrades(trades));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// ADD_TRADE
export const addTrade = (trade) => ({
  type: 'ADD_TRADE',
  trade,
});

export const startAddTrade = (tradeData = {}, accessToken) => {
  return () => {
    const {
      tradeDate = '',
      coinId = '',
      quantity = 0,
      cost = 0,
      fee = 0,
    } = tradeData;
    const trade = { tradeDate, coinId, quantity, cost, fee };

    axios
      .post(`${REACT_APP_API_URL}/trades`, trade, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// EDIT_TRADE
export const editTrade = (trade) => ({
  type: 'EDIT_TRADE',
  trade,
});

export const startEditTrade = (id, updates) => {
  return (_dispatch) => {
    const config = {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    };

    fetch(`${REACT_APP_API_URL}/trades/${id}`, config)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Unable to edit trade');
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const startEditTradeAxios = (id, updates, accessToken) => {
  return (_dispatch) => {
    axios
      .patch(`${REACT_APP_API_URL}/trades/${id}`, updates, {
        withCredentials: true,
        headers: { authorization: `bearer ${accessToken}` },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// DELETE_TRADE
export const deleteTrade = (id) => ({
  type: 'DELETE_TRADE',
  id,
});

export const startDeleteTrade = (id, accessToken) => {
  return (_dispatch) => {
    axios
      .delete(`${REACT_APP_API_URL}/trades/${id}`, {
        withCredentials: true,
        headers: { authorization: `bearer ${accessToken}` },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
