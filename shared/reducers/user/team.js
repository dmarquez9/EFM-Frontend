import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/myTeam';
import { Types as AuthTypes } from '../../creatorsTypes/authentication';
import { Types as MarketTypes } from '../../creatorsTypes/market';

const INITIAL_STATE = {
	fetching: true,
	error: null,
	team: {},
};

export const success = (state, { team }) => ({ ...state, fetching: false, team });
export const request = state => ({ ...state, fetching: true });
export const failure = (state, { error }) => ({ ...state, fetching: false, error });

const stadiumSuccess = (state, { stadium, newBalance }) => {
	const newStadium = state.team.stadium;
	Object.keys(stadium).forEach((key) => {
		newStadium[key] += Number(stadium[key]);
	});
	return {
		...state,
		fetching: false,
		team: {
			...state.team,
			balance: Number(newBalance),
			stadium: newStadium,
		},
	};
};

const verifyMatchSuccess = (state, { match, verification }) => {
	if (!verification)
		return state;
	const season = {
		...state.team.season,
		positions: state.team.season.positions.map((e) => {
			if (e.team.id === match.host.id || e.team.id === match.guest.id) {
				const position = e.position;
				if (match.host.goals === match.guest.goals) {
					position.score += 1;
					position.tiedMatches += 1;
				}
				if (match.host.id === e.team.id) {
					if (match.host.goals > match.guest.goals) {
						position.score += 3;
						position.wonMatches += 1;
					}
					else if (match.host.goals < match.guest.goals)
						position.lostMatches += 1;
					position.goals += match.host.goals;
					position.goalsAgaints += match.guest.goals;
				}
				else {
					if (match.guest.goals > match.host.goals) {
						position.score += 3;
						position.wonMatches += 1;
					}
					else if (match.guest.goals < match.host.goals)
						position.lostMatches += 1;
					position.goals += match.guest.goals;
					position.goalsAgaints += match.host.goals;
				}
				return {
					...e,
					position: {
						...e.position,
						...position,
					},
				};
			}
			return e;
		}),
	};
	return {
		...state,
		team: {
			...state.team,
			season,
		},
	};
};
const postInMarket = (state, { playerId, condition }) => {
	const playerIndex = state.team.players.findIndex(e => e.id === playerId);
	const players = state.team.players;
	players[playerIndex].market = condition;
	return {
		...state,
		team: {
			...state.team,
			players,
		},
	};
};
const approveOfferSuccess = (state, { entry }) => {
	const players = state.team.players.filter(e => e.id !== entry.player.id);
	const newPlayers = entry.offer.players.map(p => p.player);
	return {
		...state,
		team: {
			...state.team,
			balance: state.team.balance + Number(entry.offer.price),
			players: [...players, ...newPlayers],
		},
	}
};
export const HANDLERS = {
//	[Types.FETCH_MY_TEAM_REQUEST]: request,
	[Types.FETCH_MY_TEAM_SUCCESS]: success,
	[Types.FETCH_MY_TEAM_FAILURE]: failure,
	[Types.UPDATE_MY_STADIUM_REQUEST]: request,
	[Types.UPDATE_MY_STADIUM_SUCCESS]: stadiumSuccess,
	[Types.UPDATE_MY_STADIUM_FAILURE]: failure,
	[Types.VERIFY_MATCH_SUCCESS]: verifyMatchSuccess,
	[MarketTypes.POST_IN_MARKET_SUCCESS]: postInMarket,
	[MarketTypes.APPROVE_OFFER_SUCCESS]: approveOfferSuccess,
	[AuthTypes.LOGOUT]: () => INITIAL_STATE,
};

export default createReducer(INITIAL_STATE, HANDLERS);
