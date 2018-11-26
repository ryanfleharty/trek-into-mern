const initialState = {
    loggedIn: false,
    currentUser: {
        "username": null,
        "_id": null
    }
}
const authReducer = (state = initialState, action) => {
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                loggedIn: true,
                currentUser: action.payload
            }
        default:
            return state
    }
}

export default authReducer;