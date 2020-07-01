import { createActions } from 'reduxsauce';
import { PREFIX } from './constants';

const { Types, Creators } = createActions(
	{
		loginRequest: ['user', 'password'],
		loginSuccess: ['user'],
		loginFailure: ['error'],
		signupRequest: ['user'],
		signupSuccess: ['user'],
		signupFailure: ['error'],
		loginTokenSuccess: ['user'],
		logout: null,
	},
	{
		prefix: PREFIX,
	},
);

export { Types, Creators };
