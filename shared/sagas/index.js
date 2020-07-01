import { takeLatest, all } from 'redux-saga/effects';

import { Types as AuthTypes } from '../creatorsTypes/authentication';

import { login, signup } from './auth';

export default function* root() {
	yield all([]);
}
