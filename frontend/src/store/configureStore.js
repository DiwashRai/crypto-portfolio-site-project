import { createStore, combineReducers, applyMiddleware } from 'redux';
import authenticationReducer from '../reducers/authenticationReducer';
import pricesReducer from '../reducers/pricesReducer';
import tradesReducer from '../reducers/tradesReducer';
import userReducer from '../reducers/userReducer';
import thunk from 'redux-thunk';

export default () => {
  const store = createStore(
    combineReducers({
      authentication: authenticationReducer,
      prices: pricesReducer,
      trades: tradesReducer,
      user: userReducer,
    }),
    applyMiddleware(thunk)
  );

  return store;
};
