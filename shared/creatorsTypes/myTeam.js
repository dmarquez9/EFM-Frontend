import { createActions } from 'reduxsauce';
import { PREFIX } from './constants';

const { Types, Creators } = createActions({
	fetchMyTeamRequest: [],
	fetchMyTeamSuccess: ['team'],
	fetchMyTeamFailure: ['error'],
	fetchMyMatchesRequest: [],
	fetchMyMatchesSuccess: ['matches'],
	fetchMyMatchesFailure: ['error'],
	reportMatchRequest: [],
	reportMatchSuccess: ['id', 'matchInfo'],
	reportMatchFailure: ['error'],
	updateMyStadiumRequest: [],
	updateMyStadiumSuccess: ['stadium', 'newBalance'],
	updateMyStadiumFailure: ['error'],
	verifyMatchRequest: [],
	verifyMatchSuccess: ['matchId', 'verification', 'match'],
	verifyMatchFailure: ['error'],
	fetchFinancesRequest: [],
	fetchFinancesSuccess: ['finances'],
	fetchFinancesFailure: ['error'],
	addFinance: ['finance'],
}, { prefix: PREFIX });

export { Types, Creators };
