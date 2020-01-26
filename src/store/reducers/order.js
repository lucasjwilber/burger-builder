import * as actions from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
        // orders: state.orders.concat(newOrder),
        orders: {
          ...state.orders,
          ...newOrder,
        },
      };
    case actions.PURCHASE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return {};
  }
}

export default reducer;