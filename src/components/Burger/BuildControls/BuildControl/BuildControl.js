import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => {
  // const removeClass = [classes.Remove];
  // if (props.ingredients[props.type] === 0)  removeClass.push(classes.Disabled);
  
  return (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>
      {props.label}
    </div>
    <button
      className={props.ingredients[props.type] === 0 ? classes.Disabled : null}
      disabled={props.ingredients[props.type] === 0 ? true : false}
      onClick={props.ingredientRemoved}>
      -
      </button>
    <button 
      onClick={props.ingredientAdded}>
      +
      </button>
  </div>)
};

export default buildControl;