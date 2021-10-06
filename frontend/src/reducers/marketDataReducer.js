export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_MARKET_DATA':
      return action.marketData;
    default:
      return state;
  }
};
