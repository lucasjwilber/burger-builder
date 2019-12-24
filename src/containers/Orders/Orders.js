import React, { Component } from 'react';
import Order from '../../components/Order/Order.js';
import classes from './Orders.module.css';
import axios from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_DATABASE_URL}/orders.json`)
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({id: key, ...response.data[key]})
        }
        this.setState({orders: fetchedOrders, loading: false })
      })
      .catch(error => console.error(error));
  }

  render () {
    let orders = [];
    if (!this.state.loading) {
      orders = this.state.orders.map(order => {
        return <Order ingredients={order.ingredients} price={order.price} key={order.id} />
      });
    } else {
      orders = <Spinner />;
    }
    return (
      <div className={classes.Orders}>
        {orders}
      </div>
    )
  }
}

export default Orders;