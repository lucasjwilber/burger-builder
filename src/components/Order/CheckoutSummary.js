import React from 'react';
import { Link } from 'react-router-dom';
import classes from './CheckoutSummary.module.css';
import Burger from '../Burger/Burger.js';
// import BurgerIngredient from '../Burger/BurgerIngredients/BurgerIngredient';
import Button from '../UI/Button/Button.js';

const checkoutSummary = (props) => {
  return (
    <div className={classes.checkoutSummary}>
      <h1>Your burger:</h1>
      <div style={{maxWidth: '500px'}}>
        <Burger ingredients={props.ingredients} />
        <p style={{fontWeight: 'bold'}}>Price: ${props.price}</p>
        <Button buttonType='Danger' clicked={props.cancel} >CANCEL</Button>
        <Button buttonType='Success' clicked={props.proceed} >CONTINUE</Button>
      </div>
    </div>
  )
}

export default checkoutSummary;