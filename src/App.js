import React from "react";
import {Route, BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import burgerBuilderReducer from './store/reducers/burgerBuilder';
import Layout from "./hoc/Layout/Layout.js";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder.js";
import Checkout from "./containers/Checkout/Checkout.js";
import Orders from "./containers/Orders/Orders.js";
import orderReducer from './store/reducers/order';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
  ));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Layout>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
          </Layout>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
