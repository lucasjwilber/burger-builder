import * as actionTypes from "./actionTypes";
import axios from '../../axiosOrders';

export const purchaseSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    orderID: id,
    orderData: orderData,
  }
}

export const purchaseFail = (error) => {
  return {
    type: actionTypes.PURCHASE_FAIL,
    error: error,
  }
}

export const purchaseStart = () => {
  return {
    type: actionTypes.PURCHASE_START,
  }
}

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseStart());

    axios.post('/orders.json', orderData)
      .then(response => {
        console.log("response.data: ", response.data);
        dispatch(purchaseSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseFail(error));
      });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  }
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart);
    axios.get(`${process.env.REACT_APP_DATABASE_URL}/orders.json`)
        .then(response => {
          const fetchedOrders = [];
          for (let key in response.data) {
            fetchedOrders.push({id: key, ...response.data[key]})
          }
          console.log('fetched orders: ', fetchedOrders);
          dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(error => {
          dispatch(fetchOrdersFail(error));
        });
  }
}