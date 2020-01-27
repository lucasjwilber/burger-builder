import React, {Component} from "react";
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import ContactData from '../../containers/Checkout/ContactData/ContactData.js';
import CheckoutSummary from "../../components/Order/CheckoutSummary.js";

class Checkout extends Component {

  proceedToCheckout = () => {
    this.props.history.replace('/checkout/contact-info');
  }

  cancelCheckout = () => {
    this.props.history.goBack();
  }

  render() {
    //without this redirect, when the page is refreshed during checkout the app crashes due to undefined state
    let summary = <Redirect to="/" />;
    if (this.props.ingrs) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary 
            ingredients={this.props.ingrs}
            proceed={this.proceedToCheckout}
            cancel={this.cancelCheckout}
            price={this.props.price} />
          <Route 
            path={`${this.props.match.path}/contact-info`}
            component={ContactData} />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingrs: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  }
}

export default connect(mapStateToProps)(Checkout);
