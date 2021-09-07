export default (state = [], action) => {
  switch (action.type) {
    case 'SET_TRADES':
      return action.trades;
    default:
      return state;
  }
};
