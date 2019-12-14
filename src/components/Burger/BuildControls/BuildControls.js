import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl.js";

const controls = [
  {label: "Salad", type: "salad"},
  {label: "Bacon", type: "bacon"},
  {label: "Cheese", type: "cheese"},
  {label: "Meat", type: "meat"}
];

const buildControls = props => (
  <React.Fragment>
    <p className={classes.Price}>${props.price.toFixed(2)}</p>
    <div className={classes.BuildControls}>
      {controls.map(control => (
        <BuildControl
          key={control.label}
          label={control.label}
          type={control.type}
          ingredients={props.ingredients}
          ingredientAdded={() => props.ingredientAdded(control.type)}
          ingredientRemoved={() => props.ingredientRemoved(control.type)}
        />
      ))}
    </div>
  </React.Fragment>
);

export default buildControls;
