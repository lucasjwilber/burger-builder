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
  //old way of setting up state, for reference
  // constructor(props) {
  //   super(props);
  //   this.state = {...};
  // }

  state = {
    //these are now fetched from firebase
    // ingredients: {
    //   salad: 0,
    //   bacon: 0,
    //   cheese: 0,
    //   meat: 0,
    // },
    totalPrice: 4,
    purchaseable: true,
    purchasing: false,
    loading: false,
  }

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(response => {
        console.log(response);
        this.setState({ingredients: response.data});
      })
      .catch(error => console.error(error));
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
    // this.setState({loading: true})

    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Lucas',
    //     address: {
    //       street: '123 baker st',
    //       zip: 123412,
    //       country: 'USA'
    //     },
    //     email: 'test@fake.com',
    //     deliveryMethod: 'fastest'
    //   }
    // }
    // axios.post('/orders.json', order)
    //   .then(response => {
    //     this.setState({loading: false, purchasing: false});
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     this.setState({loading: false, purchasing: false});
    //   });
  }

  

  sendToCheckout = () => {
    const queryParams = [];
    for (let i in this.props.ingredients) {
      queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.props.ingredients[i])}`);
    }
    queryParams.push(`price: ${this.props.price}`);
    console.log('queryParams:', queryParams);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname:'/checkout',
      search: `?${queryString}`
    });
  }

  

  render() {
    let burgerSection = <Spinner />;
    let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    if (this.state.ingredients) {
      burgerSection = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
            ingredients={this.state.ingredients}
            purchaseable={this.state.purchaseable}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler} />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary 
          ingredients={this.state.ingredients} 
          // continue={this.purchaseContinueHandler}
          continue={this.sendToCheckout}
          cancel={this.purchaseCancelHandler}
          price={this.state.totalPrice}
        />
      );
    }

    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.closeModalHandler}>
          {orderSummary}
        </Modal>
        {burgerSection}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);