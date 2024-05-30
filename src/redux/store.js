import {
    combineReducers,
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
  } from 'redux';
  
  import {thunk} from 'redux-thunk';
  import authReducer from './auth/reducer';
  import banksReducer from './banks/reducer';
  import notifReducer from './notif/reducer';
  import productsReducer from './products/reducer';
  import paymentsReducer from './payments/reducer';
  import eventsReducer from './events/reducer';
  import listsReducer from './lists/reducer';
  import ordersReducer from './orders/reducer';
  
  const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const rootReducers = combineReducers({
    auth: authReducer,
    banks: banksReducer,
    notif: notifReducer,
    products: productsReducer,
    payments: paymentsReducer,
    events: eventsReducer,
    lists: listsReducer,
    orders: ordersReducer,
  });
  const store = createStore(
    rootReducers,
    composerEnhancer(applyMiddleware(thunk))
  );
  
  export default store;