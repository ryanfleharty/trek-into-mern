import { LOGIN } from './actionTypes';

export const login = async(dispatch, formData) => {
    const response = await fetch('http://localhost:9001/auth/login', {
        credentials: 'include',
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const parsedResponse = await response.json();
    if(parsedResponse.status === 200){
        dispatch({
            type: LOGIN,
            payload: parsedResponse.data
        })
    }else{
        //TODO: DISPATCH LOGIN_FAILURE
    }
}

export const register = async(dispatch, formData) => {
    const response = await fetch('http://localhost:9001/users', {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const parsedResponse = await response.json();
    if(parsedResponse.status === 200){
        dispatch({
            type: "REGISTER",
            payload: parsedResponse.data
        })
    }else{
        //TODO: REGISTER_FAILURE
    }
}