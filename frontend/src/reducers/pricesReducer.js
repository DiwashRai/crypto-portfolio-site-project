export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_PRICES':
      return action.prices;
    default:
      return state;
  }
};

export const selectPrices = (state) => state.prices;
