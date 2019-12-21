import React, {Component} from "react";
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData.js';
import CheckoutSummary from "../../components/Order/CheckoutSummary.js";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0
    },
    price: 4,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ingredients: ingredients, price: price})
  }


  proceedToCheckout = () => {
    console.log('proceed to checkout clicked');
    this.props.history.replace('/checkout/contact-info');
  }

  cancelCheckout = () => {
    console.log('order cancel clicked');
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          proceed={this.proceedToCheckout}
          cancel={this.cancelCheckout}
          price={this.state.price} />
          
          <Route 
            path={`${this.props.match.path}/contact-info`}
            render={() => <ContactData ingredients={this.state.ingredients} price={this.state.price} />} />
      </div>
    );
  }
}

export default Checkout;
