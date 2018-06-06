import axios from 'axios';
import { SET_SONG } from '../types/types';
import qs from 'qs';
export function setSong(data) {
	return {
		type: SET_SONG,
		payload: data
	};
}

export function getSong(seokey) {
	return dispatch => {
		const queryParams = qs.stringify({
			type:'song',
			subtype:'song_detail',
			seokey:seokey
		});		
		const url =  'https://apiportalx.gaana.com/index.php?' + queryParams;		
		return axios.get(url).then(res => {			
			return res.data.tracks;
		}).then(data => {
			dispatch(setSong(data));
			return data;
		});
	}
}