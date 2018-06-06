import { SET_SONG } from '../types/types';

export default (initialState = {	
	song: {}
}, action = {}) => {
	switch (action.type) {		
		case SET_SONG:
			return {
				song: action.payload
			};
		default:
			return initialState;
	}
};