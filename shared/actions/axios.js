import axios from 'axios';
import cookie from 'cookie-machine';
import config from '../../config';

const instance = axios.create({ baseURL: config('apiURL') });

instance.interceptors.request.use(
	(httpConfig) => {
		let token;
		try {
			token = cookie.get('fm_token');
		} catch (e) {
			console.log('Caught error', e);
		}
		if (token) httpConfig.headers.Authorization = `Bearer ${token}`;
		return httpConfig;
	},
	err => Promise.reject(err),
);
export default instance;
