import React, {Component} from 'react';
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

    return (
      <Aux>
        <h3>Your Order:</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>Total price: <strong>${this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.cancel} buttonType='Danger'>CANCEL</Button>
        <Button clicked={this.props.continue} buttonType='Success'>CONTINUE</Button>
      </Aux>
    )
  }
};

export default OrderSummary;