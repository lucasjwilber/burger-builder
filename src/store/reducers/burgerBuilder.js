import * as actionTypes from '../actions/actionTypes';
import {updatedObject, updateObject} from '../utility';

const initialState = {
  //ingredients are fetched from firebase now
  ingredients: null,
  totalPrice: 4,
  error: false,
  loading: true,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: .7,
  meat: 1.5
}

const addIngredient = (state, action) => {
  const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],};
  return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
  }
}

const setIngredients = (state, action) => {
  return {
    ...state,
    //explicitly defining ingredients here to control the order in which they render
    //this conveniently also resets the state
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    error: false,
    loading: false,
    totalPrice: 4,
  }
}

const fetchIngredientsFailed = (state, action) => {
  return {
    ...state,
    error: true,
    loading: false,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:  return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state;
  }
}

export default reducer;