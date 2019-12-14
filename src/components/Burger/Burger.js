import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient.js';

const burger = (props) => {
  // const ingredientsArray = Object.keys(props.ingredients)
  //   .map(key => {
  //     return [...Array(props.ingredients[key])].map((_, i) => {
  //       return <BurgerIngredient key={key + i} type={key} />;
  //     });
  //   });

  //this is easier to read and also results in an empty array when ingredients are all set to 0
  const ingredientsArray = [];
  Object.entries(props.ingredients).forEach(ingredient => {
    for (let i = 0; i < ingredient[1]; i++) {
      ingredientsArray.push(<BurgerIngredient key={ingredient[0] + i} type={ingredient[0]} />);
    }
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {ingredientsArray.length > 0 ? ingredientsArray : <p>Add some ingredients below!</p>}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
}

export default burger;