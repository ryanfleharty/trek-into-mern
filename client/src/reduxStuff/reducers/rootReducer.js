import {combineReducers} from 'redux';
import authReducer from './authReducer';
//TODO: add episodeReducer
const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;