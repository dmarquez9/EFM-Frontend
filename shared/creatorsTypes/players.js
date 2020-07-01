import { createActions } from 'reduxsauce';
import { PREFIX } from './constants';

const { Types, Creators } = createActions({
	fetchPlayersRequest: [],
	fetchPlayersSuccess: ['players'],
	fetchPlayersFailure: ['error'],
	fetchPlayerRequest: [],
	fetchPlayerSuccess: ['player'],
	fetchPlayerFailure: ['error'],
}, { prefix: PREFIX });

export { Types, Creators };
