import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH} from '../constants/actionTypes';
import * as api from '../api';

//action creators
export const getPosts = () => async(dispatch) => {                         //redux thunk allows to add another function - here a function is returning a function
    try {
        const { data } = await api.fetchPosts();                    // {data} contains the data component of response
        dispatch({type: FETCH_ALL, payload: data});                //the syntax of this is given below
    } catch (error) {
        console.log(error.message)
    }
    // const action = {type : 'FETCH_ALL', payload : []}
    // dispatch(action);                                               // here instead of returning action we dispatch it
}

export const getPostsBySearch = (searchQuery) => async(dispatch) => {
    try {
        const { data: {data} } = await api.fetchPostsBySearch(searchQuery)
        dispatch({type: FETCH_BY_SEARCH, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async(dispatch) => {
    try {
        const  {data} = await api.createPost(post);
        dispatch({ type:CREATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        const {data} = await api.updatePost(id,post);
        dispatch({type:UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type:DELETE, payload:id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({type:UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}