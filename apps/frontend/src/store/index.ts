import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'store/rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('store/rootReducer', () => {
    const newRootReducer = require('store/rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;

export default store;
