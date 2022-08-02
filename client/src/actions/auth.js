import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, history) => async(dispatch) => {
    try {
        //log in the user
        history('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async(dispatch) => {
    try {
        //signup the user
        history('/');
    } catch (error) {
        console.log(error);
    }
}