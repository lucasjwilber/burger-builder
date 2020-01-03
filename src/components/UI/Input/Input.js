import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;

  const inputClasses = [classes.InputElement];
  if (props.touched) {
    if (!props.valid) {
      inputClasses.push(classes.Invalid);
    } else if (props.valid) {
      inputClasses.push(classes.Valid);
    }
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input 
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.changed}
        valid='{props.valid}'
        {...props.elementConfig} />
      break;
    case ('textArea'):
      inputElement = <input 
      className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.changed}
        valid='{props.valid}'
        {...props.elementConfig} />
      break;
    case ('select'):
      inputElement = 
      <select 
      className={inputClasses.join(' ')}
        onChange={props.changed}
        valid='{props.valid}'
        {...props.elementConfig}>
          {props.options.map((option, i) => {
            return <option name={option.value} key={option.value}>
              {option.displayValue}
            </option>
          })}
        </select>
      break;
    default:
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default input;