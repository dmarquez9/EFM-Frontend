import { createActions } from 'reduxsauce';
import { PREFIX } from './constants';

const { Types, Creators } = createActions({
	fetchSeasonRequest: [],
	fetchSeasonSuccess: ['season'],
	fetchSeasonFailure: ['error'],
	fetchDivisionRequest: [],
	fetchDivisionSuccess: ['division'],
	fetchDivisionFailure: ['error'],
	fetchLeagueRequest: [],
	fetchLeagueSuccess: ['league'],
	fetchLeagueFailure: ['error'],
}, { prefix: PREFIX });

export { Types, Creators };
