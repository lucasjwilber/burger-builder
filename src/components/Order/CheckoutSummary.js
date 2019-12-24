import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../Burger/Burger.js';
import Button from '../UI/Button/Button.js';

const checkoutSummary = (props) => {
  return (
    <div className={classes.checkoutSummary}>
      <h1>Your burger:</h1>
      <div style={{maxWidth: '500px'}}>
        <Burger ingredients={props.ingredients} />
        <p style={{fontWeight: 'bold'}}>Price: ${props.price.toFixed(2)}</p>
        <Button buttonType='Danger' clicked={props.cancel} >CANCEL</Button>
        <Button buttonType='Success' clicked={props.proceed} >CONTINUE</Button>
      </div>
    </div>
  )
}

export default checkoutSummary;