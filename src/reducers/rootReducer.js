import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import songsReducer from './songsReducer';

export default combineReducers ({
    homeReducer,
    songsReducer	
});