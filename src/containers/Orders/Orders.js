import React, { Component } from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order.js';
import classes from './Orders.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import {fetchOrders} from '../../store/actions/order';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render () {
    let orders = <Spinner />;

    //BUG: props are undefined on first page load. thus if the below condition is (!this.props.loading) it still fires. may not be correctly working asynchronously.

    if (this.props.loading === false) {
      orders = this.props.orders.map(order => (
          <Order 
            ingredients={order.ingredients} 
            price={order.price} 
            key={order.id} />
      ));
    }
    console.log(this.props.loading);
    console.log(this.props.orders);
    return (
      <div className={classes.Orders}>
        {orders}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(fetchOrders()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);