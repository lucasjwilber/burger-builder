import React from 'react';
import Layout from './hoc/Layout/Layout.js';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder.js';

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder></BurgerBuilder>
      </Layout>
    </div>
  );
}

export default App;
