import React from "react";
import classes from "./Order.module.css";

const order = props => {
  const ingredientsArray = [];
  //turn ingredients object into an array of objects
  if (props.ingredients) {
    Object.entries(props.ingredients).forEach(ing =>
      ingredientsArray.push(ing)
    );
  }

  const ingredientsOutput = ingredientsArray.map((ig, i) => {
    return (
      <span
        key={`${ig.name}${i}`}
        style={{
          textTransform: "capitalize",
          padding: "0.5em",
          margin: "0.5em",
          backgroundColor: "lightgray"
        }}
      >
        {ig[0]}: {ig[1]}
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>{ingredientsOutput}</p>
      <p>
        Price: <strong>${props.price}</strong>
      </p>
    </div>
  );
};

export default order;
