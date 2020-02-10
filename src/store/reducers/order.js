import * as actions from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
}

const purchaseInit = (state, action) => {
  return {
    ...state,
    purchased: false,
  }
}

//TODO: could probably combine some of these that only handle state + loading to "asyncStart"/"asyncFailed" 
const purchaseStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
}

const purchaseSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
  }
  return {
    ...state,
    loading: false,
    orders: {
      ...state.orders,
      ...newOrder,
    },
    purchased: true,
  };
}

const purchaseFail = (state, action) => {
  return {
    ...state,
    loading: false,
  };
}

const fetchOrdersStart = (state, action) => {
  return {
    ...state,
    loading: true,
  }
}

const fetchOrdersSuccess = (state, action) => {
  return {
    ...state,
    orders: action.orders,
    loading: false,
  }
}

const fetchOrdersFail = (state, action) => {
  return {
    ...state,
    loading: false,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PURCHASE_INIT: return purchaseInit(state, action);
    case actions.PURCHASE_START: return purchaseStart(state, action);
    case actions.PURCHASE_SUCCESS: return purchaseSuccess(state, action);
    case actions.PURCHASE_FAIL: return purchaseFail(state, action);
    case actions.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
    case actions.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case actions.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
    default: return {};
  }
}

export default reducer;