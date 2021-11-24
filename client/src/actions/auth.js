import { AUTH } from "../Constants/ActionTypes.js";
import * as api from "../api";

export const signin = (formData, history) => async (dispatch) => {
  try {
    //sign in the person
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    history("/");
  } catch (error) {
    alert("Invalid Credentials");
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    //sign in the person
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    history("/");
  } catch (error) {
    console.log(error);
  }
};
