import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from './modules/index'

const store = createStore(
    reducer,  
      applyMiddleware(thunk)
  );

export default store;

