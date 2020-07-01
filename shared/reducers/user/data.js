import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/authentication';

export const INITIAL_STATE = {};

export const success = (_, { user }) => user;

export const HANDLERS = {
	[Types.SIGNUP_SUCCESS]: success,
	[Types.LOGIN_SUCCESS]: success,
	[Types.LOGIN_TOKEN_SUCCESS]: success,
	[Types.LOGOUT]: () => INITIAL_STATE,
};

export default createReducer(INITIAL_STATE, HANDLERS);
