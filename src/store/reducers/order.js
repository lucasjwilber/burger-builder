import * as actions from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      }

    case actions.PURCHASE_START:
      return {
        ...state,
        loading: true,
      };

    case actions.PURCHASE_SUCCESS:
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

    case actions.PURCHASE_FAIL:
      return {
        ...state,
        loading: false,
      };

    case actions.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      }

    case actions.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      }

    case actions.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
      }
      
    default:
      return {};
  }
}

export default reducer;