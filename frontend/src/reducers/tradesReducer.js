export default (state = [], action) => {
  switch (action.type) {
    case 'SET_TRADES':
      return action.trades;
    default:
      return state;
  }
};

export const selectTrades = (state) => state.trades;

export const selectTradeById = (state, tradeId) =>
  state.trades.find((trade) => trade._id === tradeId);

export const selectTotalOriginalValue = (state) => {
  const trades = selectTrades(state);
  return trades.reduce((total, trade) => total + trade.total, 0);
};
