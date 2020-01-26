import * as actionTypes from "./actionTypes";
import axios from '../../axiosOrders';

export const purchaseSuccess = (id, orderData) => {
  console.log("entered purchase success func")
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