import React, { Component } from 'react';
import Aux from '../../hoc/AuxComponent.js';
import Burger from '../../components/Burger/Burger.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';
import Modal from '../../components/UI/Modal/Modal.js';
import Spinner from '../../components/UI/Spinner/Spinner.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js';
import axios from '../../axiosOrders.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js';

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
    purchaseable: false,
    purchasing: false,
    loading: false,
  }

  addIngredientHandler = (type) => {
    let updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type]++;
    let newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //if we don't pass the current state into updatePurchaseState and try to access it inside the function, we run into sync issues and get an out of date state reading
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] === 0) return;
    let updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type]--;
    let newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
  }

  updatePurchaseState = (ingredients) => {
    let sum = Object.values(ingredients).reduce((sum, ingredient) => sum += ingredient, 0);
    sum > 0 ? this.setState({purchaseable: true}) : this.setState({purchaseable: false});
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  closeModalHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true})

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Lucas',
        address: {
          street: '123 baker st',
          zip: 123412,
          country: 'USA'
        },
        email: 'test@fake.com',
        deliveryMethod: 'fastest'
      }
    }
    axios.post('/orders.js0n', order)
      .then(response => {
        this.setState({loading: false, purchasing: false});
      })
      .catch(error => {
        console.error(error);
        this.setState({loading: false, purchasing: false});
      });
  }

  render() {
    let orderSummary = <OrderSummary 
    ingredients={this.state.ingredients} 
    continue={this.purchaseContinueHandler}
    cancel={this.purchaseCancelHandler}
    price={this.state.totalPrice}
  />;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.closeModalHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}
          ingredients={this.state.ingredients}
          purchaseable={this.state.purchaseable}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler} />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);