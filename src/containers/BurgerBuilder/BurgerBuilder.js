import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/AuxComponent.js';
import Burger from '../../components/Burger/Burger.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';
import Modal from '../../components/UI/Modal/Modal.js';
import Spinner from '../../components/UI/Spinner/Spinner.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js';
import axios from '../../axiosOrders.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js';
import * as burgerBuilderActions from '../../store/actions/burgerBuilder';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount = () => {
    this.props.initIngredients();
  }

  updatePurchaseState = (ingredients) => {
    let sum = Object.values(ingredients).reduce((sum, ingredient) => sum += ingredient, 0);
    return (sum > 0);
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

  sendToCheckout = () => {
    this.props.history.push('/checkout');
  }

  

  render() {
    let burgerSection = this.props.error ? <p>Cannot fetch ingredients</p> : <Spinner />;
    let orderSummary = null;

    if (this.props.loading) {
      orderSummary = <Spinner />;
    }

    if (this.props.ingrs) {
      burgerSection = (
        <React.Fragment>
          <Burger ingredients={this.props.ingrs}/>
          <BuildControls 
            price={this.props.price}
            ordered={this.purchaseHandler}
            ingredients={this.props.ingrs}
            purchaseable={this.updatePurchaseState(this.props.ingrs)}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved} />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary 
          ingredients={this.props.ingrs} 
          continue={this.sendToCheckout}
          cancel={this.purchaseCancelHandler}
          price={this.props.price}
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

const mapStateToProps = state => {
  return {
    ingrs: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    // loading: state.burgerBuilder.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingrName) => dispatch(burgerBuilderActions.addIngredient(ingrName)),
    onIngredientRemoved: (ingrName) => dispatch(burgerBuilderActions.removeIngredient(ingrName)),
    initIngredients: () => dispatch(burgerBuilderActions.getIngredients()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));