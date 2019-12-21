import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button.js';
import classes from './ContactData.module.css';
import axios from 'axios';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: '',
      country: '',
    },
    price: 4,
    loading: false,
  }

  orderSubmitted = (event) => {
    event.preventDefault();
    this.setState({loading: true})
    const order = {
      ingredients: this.props.ingredients,
      price: this.state.price,
      // customer: {
      //   name: 'Lucas',
      //   address: {
      //     street: '123 baker st',
      //     zip: 123412,
      //     country: 'USA'
      //   },
      //   email: 'test@fake.com',
      //}
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false, purchasing: false});
      })
      .catch(error => {
        console.error(error);
        this.setState({loading: false, purchasing: false});
      });
  }

  render () {
    return (
      <div className={classes.ContactData}>
        <h2>Enter your contact info:</h2>
        <form>
          <section>
            <label>Name</label>
            <input type="text" name="name" />
          </section>

          <section>
            <label>email address</label>
            <input type="text" name="email" />
          </section>

          <section>
            <label>Address</label>
            <input type="text" name="street" placeholder="Street" />
            <input type="text" name="zipCode" placeholder="Zip Code" />
            <input type="text" name="country" placeholder="Country" />
          </section>

          <section>
            <Button  buttonType='Danger'>CANCEL</Button>
            <Button buttonType='Success' clicked={this.orderSubmitted}>ORDER</Button>
          </section>
        </form>
      </div>
    )
  }
}

export default ContactData;