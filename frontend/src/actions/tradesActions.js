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

// ADD_TRADE
export const addTrade = (trade) => ({
  type: 'ADD_TRADE',
  trade,
});

export const startAddTrade = (tradeData = {}) => {
  return (dispatch) => {
    const {
      tradeDate = '',
      coinId = '',
      quantity = 0,
      cost = 0,
      fee = 0,
    } = tradeData;
    const trade = { tradeDate, coinId, quantity, cost, fee };

    const config = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trade),
    };

    fetch(`${REACT_APP_API_URL}/trades`, config)
      .then((response) => {
        if (response.status !== 201) {
          throw new Error(response.err);
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

// EDIT_TRADE
export const editTrade = (trade) => ({
  type: 'EDIT_TRADE',
  trade,
});

export const startEditTrade = (id, updates) => {
  return (dispatch) => {
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

// DELETE_TRADE
export const deleteTrade = (id) => ({
  type: 'DELETE_TRADE',
  id,
});

export const startDeleteTrade = (id) => {
  return (dispatch) => {
    const config = {
      method: 'DELETE',
      credentials: 'include',
    };

    fetch(`${REACT_APP_API_URL}/trades/${id}`, config)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`Unable to delete trade with id: ${id}`);
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
