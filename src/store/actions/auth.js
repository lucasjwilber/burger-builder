import axios from 'axios';

import * as actions from './actionTypes';

export const authStart = () => {
  return {
    type: actions.AUTH_START,
  }
}

export const authSuccess = (authData) => {
  return {
    type: actions.AUTH_SUCCESS,
    authData: authData,
  }
}

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error: error,
  }
}

//https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
export const authInit = (email, password) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }

    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_AUTH_API_KEY}`, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data));
      })
      .catch(error => {
        console.error(error);
        dispatch(authFail(error));
      })
  }
}