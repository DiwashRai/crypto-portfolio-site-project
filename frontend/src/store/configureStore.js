import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authenticationReducer from '../reducers/authenticationReducer';
import marketDataReducer from '../reducers/marketDataReducer';
import pricesReducer from '../reducers/pricesReducer';
import tradesReducer from '../reducers/tradesReducer';
import userReducer from '../reducers/userReducer';
import thunk from 'redux-thunk';

const componseEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      authentication: authenticationReducer,
      marketData: marketDataReducer,
      prices: pricesReducer,
      trades: tradesReducer,
      user: userReducer,
    }),
    componseEnhancers(applyMiddleware(thunk))
  );

  return store;
};
