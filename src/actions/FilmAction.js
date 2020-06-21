import Axios from "axios";

import Toastr from "toastr";
import "toastr/build/toastr.min.css"
import history from "../config/history";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': ''
}

export const fetchFilmData = (params) => async dispatch => {
    await Axios.get(process.env.REACT_APP_END_POINT + `/films`, {params: params}).then(async res => {
        dispatch({type: 'FETCH_FILMS', payload: await res.data.data});
    })
}

export const fetchFlimUseSlug = (slug) => async dispatch => {
    await Axios.get(process.env.REACT_APP_END_POINT + `/films/${slug}`).then(async res => {
        dispatch({type: 'VIEW_FILM', payload: await res.data.data});
    })
}

export const userSignin = (data) => async dispatch => {
    await Axios.post(process.env.REACT_APP_END_POINT + `/signin`, data, { headers })
        .then(async res => {
            dispatch({type: 'SET_USERINFO', payload: await res.data.data})
            localStorage.setItem('access_token', res.data.data.access_token.token_type + ' ' + res.data.data.access_token.access_token);
            localStorage.setItem('user_name', res.data.data.user_data.name);
            localStorage.setItem('user_email', res.data.data.user_data.email);
            Toastr.success("Sucessfully Login")

            history.goBack(0)
        })
        .catch(async err => {
            if(err.response.status === 422){
                dispatch({type: 'SET_ERRORS', payload: await err.response.data.errors})
            }

            Toastr.warning(err.response.data.message)
        })
}

export const userSignup = (data) => async dispatch => {
    await Axios.post(process.env.REACT_APP_END_POINT + `/signup`, data, { headers })
        .then(async res => {
            dispatch({type: 'SET_USERINFO', payload: await res.data.data})
            localStorage.setItem('access_token', res.data.data.access_token.token_type + ' ' + res.data.data.access_token.access_token);
            localStorage.setItem('user_name', res.data.data.user_data.name);
            localStorage.setItem('user_email', res.data.data.user_data.email);
            Toastr.success("Sucessfully Login")

            console.log(history.location)
            // window.location.href = history.goBack()
        })
        .catch(async err => {
            if(err.response.status === 422){
                dispatch({type: 'SET_ERRORS', payload: await err.response.data.errors})
            }

            Toastr.warning(err.response.data.message)
        })
}

export const userSignuot = () => dispatch => {
    const userdata = {
        access_token: {},
        user_data: {}
    }
    dispatch({type: 'SET_USERINFO', payload: userdata})

    history.goBack()
}

export const userComment = (data, token) => async dispatch => {
    headers.Authorization = token

    await Axios.post(process.env.REACT_APP_END_POINT + '/comments', data, { headers })
        .then(async res => {
            Toastr.success("Sucess")
        })
        .catch(async err => {
            if(err.response.status === 422){
                dispatch({type: 'SET_ERRORS', payload: await err.response.data.errors})
            }

            Toastr.warning(err.response.data.message)
        })
}

export const fetchStaticData = () => async dispatch => {
    await Axios.get(process.env.REACT_APP_END_POINT + '/static-data')
        .then(async res => {
            dispatch({type: 'SET_STATIC_DATA', payload: res.data.data})
        })
}

export const storeFilmData = (data) => async dispatch => {
    await Axios.post(process.env.REACT_APP_END_POINT + '/films', data, {headers: {'content-type': 'multipart/form-data'}}).then(async res => {
        Toastr.success("New film added")
        history.push('/')
    }).catch(async err => {
        if(err.response.status === 422){
            dispatch({type: 'SET_ERRORS', payload: await err.response.data.errors})
        }

        Toastr.warning(err.response.data.message)
    })
}