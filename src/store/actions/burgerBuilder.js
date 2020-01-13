import * as actionTypes from "./actionTypes";
import axios from "../../axiosOrders";

export const addIngredient = ingrName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingrName
  };
};

export const removeIngredient = ingrName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingrName
  };
};

const setIngredients = ingrs => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingrs,
    loading: false
  };
};
const fetchIngredientsFailed = (error) => {
  console.error('error fetching ingredients from firebase', error);
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error: true,
  }
}
export const getIngredients = () => {
  //thunk's async function:
  return dispatch => {
    axios
      .get(`${process.env.REACT_APP_DATABASE_URL}/ingredients.json`)
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed(error));
      });
  };
};
