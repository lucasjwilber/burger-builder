import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
  const ingredientsArray = [];
  //turn ingredients object into an array of objects
  Object.entries(props.ingredients).forEach(ing => ingredientsArray.push(ing));
  console.log('asdf', ingredientsArray);

  const ingredientsOutput = ingredientsArray.map(ig => {
    return (
      <span  
        style={{
          textTransform: 'capitalize', 
          padding: '0.5em', 
          margin: '0.5em', 
          backgroundColor: 'lightgray'}}
        key={ig.name}>
          {ig[0]}: {ig[1]}
      </span>
    )
  });

  return (
    <div className={classes.Order}>
      <p>{ingredientsOutput}</p>
      <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
    </div>
  )
}

export default order;