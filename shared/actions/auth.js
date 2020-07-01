import cookie from 'cookie-machine';
import { SubmissionError } from 'redux-form';
import { signup as signupRequest, login as loginRequest, authByToken as authByTokenRequest } from './api';
import { Types as AuthTypes, Creators } from '../creatorsTypes/authentication';

export const signup = async (user) => {
	const { response, error } = await signupRequest(user);
	if (error)
		throw new SubmissionError({
			email: error.error.email ? 'El email ya esta en uso' : null,
			username: error.error.username ? 'El nombre de usuario ya esta en uso' : null,
			_error: 'No se pudo crear la cuenta',
		});
	else {
		cookie.set('fm_token', response.token);
		return Promise.resolve(response);
	}
};
export const login = async (user, password) => {
	const { response, error } = await loginRequest(user, password);
	if (error)
		throw new SubmissionError({
			_error: 'Verifica el nombre de usuario y contraseña',
		});
	else {
		cookie.set('fm_token', response.token);
		return Promise.resolve(response);
	}
};

export const authByToken = () => async (dispatch) => {
	if (cookie.get('fm_token')) {
		const { response, error } = await authByTokenRequest();
		if (!error) {
			cookie.set('fm_token', response.token);
			dispatch({ type: AuthTypes.LOGIN_TOKEN_SUCCESS, user: response.user });
		}
		else {
			cookie.remove('fm_token');
		}
	}
};

export const logout = () => (dispatch) => {
	cookie.remove('fm_token');
	dispatch(Creators.logout());
};
