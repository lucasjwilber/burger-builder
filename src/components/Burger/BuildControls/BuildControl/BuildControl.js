import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => {
  if (props.ingredients[props.key] === 0)  classes.BuildControl.push('Disabled');
  return (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button 
      className={props.ingredients[props.type] === 0 ? classes.Disabled : classes.Remove}
      disabled={props.ingredients[props.type] === 0 ? true : false}
      onClick={props.ingredientRemoved}>
      -
      </button>
    <button 
      className={classes.Add}
      onClick={props.ingredientAdded}>
      +
      </button>
  </div>)
};

export default buildControl;