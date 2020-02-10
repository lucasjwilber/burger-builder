import React, {Component, isValidElement} from 'react';
import {connect} from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import {authInit, authStart, authSuccess, autFail} from '../../store/actions/auth';

class Auth extends Component {

  state = {
    formElements: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Email Address",
        },
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
        value: "",
      },
    }
  }

  inputChangedHandler = (event, formEl) => {
      const updatedForm = {
          ...this.state.formElements,
          [formEl]: {
              ...this.state.formElements[formEl],
              value: event.target.value,
              valid: this.checkValidity(event.target.value, this.state.formElements[formEl].validation),
              touched: true,
          }
      }
      this.setState({formElements: updatedForm});
  };


  checkValidity = (value, rules) => {
    let valid = true;
    if (rules.required && value === "" ||
    rules.minLength && value.length < rules.minLength) {
      valid = false;
    }
    if (rules.isEmail) {
        const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        valid = pattern.test(value);
    }
    return valid;
  };

  submitHandler = (event) => {
      event.preventDefault();
      this.props.onAuth(this.state.formElements.email.value, this.state.formElements.password.value);
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.formElements) {
      formElementsArray.push({
        id: key,
        config: this.state.formElements[key]
      });
    }

    const form = formElementsArray.map(formEl => (
      <Input 
        key={formEl.id}
        elementType={formEl.config.elementType}
        elementConfig={formEl.config.elementConfig}
        value={formEl.config.value}
        changed={event => this.inputChangedHandler(event, formEl.id)}
        valid={formEl.config.valid}
        touched={formEl.config.touched}
      />
    ));

    return (
      <div>
        <form className={classes.Auth} onSubmit={this.submitHandler}>
          {form}
          <Button buttonType="Success" >SUBMIT</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(authInit(email, password)),
    }
}

export default connect(null, mapDispatchToProps)(Auth);