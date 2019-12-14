import React, { Component } from 'react';
import Aux from '../../hoc/AuxComponent.js';
import Burger from '../../components/Burger/Burger.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: .7,
  meat: 1.5
}

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {...};
  // }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
  }

  addIngredientHandler = (type) => {
    let updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type]++;
    let newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] === 0) return;
    let updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type]--;
    let newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  }

  render() {
    // const disabledInfo = {...this.state.ingredients};
    // for (let key in disabledInfo) {
    //   disabledInfo[key] = 
    // }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          price={this.state.totalPrice}
          ingredients={this.state.ingredients}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler} />
      </Aux>
    );
  }
}

export default BurgerBuilder;