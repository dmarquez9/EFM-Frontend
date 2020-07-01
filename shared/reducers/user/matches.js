import { merge, unionBy } from 'lodash';
import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/myTeam';
import { Types as AuthTypes } from '../../creatorsTypes/authentication';

const INITIAL_STATE = [];

export const success = (_, { matches }) => matches;

export const reportMatchSuccess = (state, { id, matchInfo }) => {
	let match = state.find(m => m.match.id === id);
	if (!match) return state;
	match = merge(match, matchInfo);
	return unionBy(state, [match], 'match.id');
};

export const verifyMatchSuccess = (state, { matchId, verification }) => {
	let match = state.find(m => m.match.id === matchId);
	if (!match) return state;
	if (verification)
		match = {
			...match,
			match: {
				...match.match,
				played: true,
			},
			host: {
				...match.host,
				verification: true,
			},
			guest: {
				...match.guest,
				verification: true,
			},
		};
	else
		match = {
			...match,
			host: {
				...match.host,
				verification: null,
				scorers: [],
				goals: 0,
			},
			guest: {
				...match.guest,
				verification: null,
				scorers: [],
				goals: 0,
			},
		};
	const matches = state.filter(m => m.match.id !== matchId);
	return [...matches, match];
};

export const HANDLERS = {
	[Types.FETCH_MY_MATCHES_SUCCESS]: success,
	[Types.REPORT_MATCH_SUCCESS]: reportMatchSuccess,
	[Types.VERIFY_MATCH_SUCCESS]: verifyMatchSuccess,
	[AuthTypes.LOGOUT]: () => INITIAL_STATE,

};

export default createReducer(INITIAL_STATE, HANDLERS);
