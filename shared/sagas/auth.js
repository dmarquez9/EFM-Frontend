/* eslint no-underscore-dangle: ["error", { "allow": ["_rev", ""] }] */

import { put, call } from 'redux-saga/effects';
import { Types as AuthTypes } from '../creatorsTypes/authentication';
import { signup as signupRequest } from '../actions/api';

function* login({ user, password }) {
	console.log(a);
	yield put({
		type: AuthTypes.AUTH_SUCCESS,
	});
}

function* signup({ user }) {
	const { response, error } = yield call(signupRequest, user);
	console.log({
		response,
		error,
	});
	yield put({
		type: AuthTypes.AUTH_SUCCESS,
	});
}

export { login, signup };
