import React, {Component} from "react";
import {connect} from 'react-redux';

import Button from "../../../components/UI/Button/Button.js";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axiosOrders";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/actionTypes';
import {purchaseStart, purchaseSuccess, purchaseBurger} from '../../../store/actions/order';
import { Redirect } from "react-router-dom";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Email"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        validation: {
          required: true,
          minLength: 5
        },
        valid: false,
        touched: false,
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        validation: {
          required: true,
          minLength: 2
        },
        valid: false,
        touched: false,
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          type: "select",
          options: [
            {value: "fast", displayValue: "Fastest"},
            {value: "cheap", displayValue: "Cheapest"}
          ]
        },
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        value: "fast"
      },
      formIsValid: false
    },
  };

  componentDidMount() {
    this.setState({loading: false});
  }

  inputChanged = (event, id) => {
    const updatedForm = {...this.state.orderForm};
    const updatedFormElement = {...updatedForm[id]};
    updatedForm[id] = updatedFormElement;

    updatedFormElement.validation = {
      ...this.state.orderForm[id].validation
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    let formIsValid = true;
    for (let inputID in updatedForm) {
      if (updatedForm[inputID].valid === false) { 
        formIsValid = false
      }
    }
    updatedForm.formIsValid = formIsValid;

    this.setState({orderForm: updatedForm});
  };

  checkValidity = (value, rules) => {
    let valid = true;
    if (
      (rules.required && value === "") ||
      (rules.minLength && value.length < rules.minLength)
    ) {
      valid = false;
    }
    return valid;
  };

  orderSubmitted = event => {
    event.preventDefault();

    const formValues = {};
    for (let field in this.state.orderForm) {
      formValues[field] = this.state.orderForm[field].value;
    }

    const order = {
      ingredients: this.props.ingrs,
      price: this.props.price.toFixed(2),
      orderInfo: formValues
    };

      this.props.onBurgerOrdered(order);
  };

  render() {

    const formElementsArray = [];
    let formComponents = [];
    if (!this.props.loading) {
      for (let key in this.state.orderForm) {
        formElementsArray.push({
          id: key,
          config: this.state.orderForm[key]
        });
      }

      formComponents = formElementsArray.map(el => {
        if (el.config.elementType === "input") {
          return (
            <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              changed={event => this.inputChanged(event, el.id)}
              valid={el.config.valid}
              touched={el.config.touched}
            />
          );
        }
        if (el.config.elementType === "select") {
          return (
            <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              options={el.config.elementConfig.options}
              changed={event => this.inputChanged(event, el.id)}
              valid={el.config.valid}
              touched={el.config.touched}
            />
          );
        }
      });
    } else {
      formComponents = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h2>Enter your contact info:</h2>
        <form className={classes.Form} onSubmit={this.orderSubmitted}>
          {formComponents}
          <section>
            <Button buttonType="Danger">CANCEL</Button>
            <Button 
              buttonType="Success" 
              disabled={!this.state.orderForm.formIsValid}
              clicked={this.orderSubmitted}>
              ORDER
            </Button>
          </section>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingrs: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onBurgerOrdered: (orderData) => dispatch(purchaseBurger(orderData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));

