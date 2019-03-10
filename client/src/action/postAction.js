import axios from 'axios';
import {ADD_POST, GET_ERRORS,GET_POSTS,POST_LOADING,DELETE_POST,GET_POST} from './types'

export const addPost = postData=>dispatch=>{
    axios   
        .post('api/posts',postData)
        .then(res=>dispatch({
            type: ADD_POST,
            payload: res.data
        }))
        .catch(err=>dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}
export const getPosts = ()=>dispatch=>{
    dispatch(postLoading());
    axios   
        .get('api/posts')
        .then(res=>dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err=>dispatch({
            type:GET_POSTS,
            payload:null
        }))
}
export const getPost = (id)=>dispatch=>{
    dispatch(postLoading());
    axios   
        .get(`/api/posts/${id}`)
        .then(res=>dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err=>dispatch({
            type:GET_POST,
            payload:null
        }))
}
//Delete post 
export const deletePost=(id)=>dispatch=>{
    if(window.confirm("Are you sure delete")){
        axios   
        .delete(`/api/posts/${id}`)
        .then(res=>dispatch({
            type:DELETE_POST,
            payload:id
        }))
        .catch(err=>dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
    }
}
//Add like
export const addLike = (id)=>dispatch=>{
    axios   
        .post(`/api/posts/like/${id}`)
        .then(res=>dispatch(getPosts()))
        .catch(err=>dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}
//Remove like
export const removeLike = id=>dispatch=>{
    axios   
        .post(`/api/posts/unlike/${id}`)
        .then(res=>dispatch(getPosts()))
        .catch(err=>dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}
export const postLoading = ()=>{
    return {
        type:POST_LOADING
    }
}