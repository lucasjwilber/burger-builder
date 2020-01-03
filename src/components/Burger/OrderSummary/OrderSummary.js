import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Aux from '../../../hoc/AuxComponent.js';
import Button from '../../UI/Button/Button.js';

class OrderSummary extends Component {

  render() {
    const ingredientSummary = Object.entries(this.props.ingredients)
      .map(ingr => (
        <li key={ingr}>
          {`${ingr[0][0].toUpperCase()}${ingr[0].slice(1)}: ${ingr[1]}`}
        </li>
      ));

      
  const sendToCheckout = () => {
    const queryParams = [];
    for (let i in this.props.ingredients) {
      queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.props.ingredients[i])}`);
    }
    queryParams.push(`price=${this.props.price}`);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname:'/checkout',
      search: `?${queryString}`
    });
  }

      

    return (
      <Aux>
        <h3>Your Order:</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>Total price: <strong>${this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.cancel} buttonType='Danger'>CANCEL</Button>
        <Button buttonType='Success' clicked={sendToCheckout}>CONTINUE</Button>
      </Aux>
    )
  }
};

export default withRouter(OrderSummary);