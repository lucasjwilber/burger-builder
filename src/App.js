import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Layout from "./hoc/Layout/Layout.js";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder.js";
import Checkout from "./containers/Checkout/Checkout.js";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/checkout' component={Checkout} />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
