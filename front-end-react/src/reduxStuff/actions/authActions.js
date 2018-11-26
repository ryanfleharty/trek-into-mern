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
            type: "LOGIN",
            payload: parsedResponse.data
        })
    }else{
        //TODO: DISPATCH LOGIN_FAILURE
    }
}