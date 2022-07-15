import * as api from '../api';

//action creators
export const getPosts = () => async(dispatch) => {                         //redux thunk allows to add another function - here a function is returning a function
    try {
        const { data } = await api.fetchPosts();                    // {data} contains the data component of response
        dispatch({type: 'FETCH_ALL', payload: data})                //the syntax of this is given below
    } catch (error) {
        console.log(error.message)
    }
    // const action = {type : 'FETCH_ALL', payload : []}
    // dispatch(action);                                               // here instead of returning action we dispatch it
}

export const createPost = (post) => async(dispatch) => {
    try {
        const  {data} = await api.createPost(post);
        dispatch({ type:'CREATE', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        const {data} = await api.updatePost(id,post);
        dispatch({type:'UPDATE', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}