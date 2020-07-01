import { merge, isEmpty } from 'lodash';
import { Creators } from '../creatorsTypes/myTeam';
import { Creators as TeamsCreators } from '../creatorsTypes/teams';
import { Creators as PlayersCreators } from '../creatorsTypes/players';
import {
	getMyTeam as getMyTeamRequest,
	getMyMatches as getMyMatchesRequest,
	getTeamPlayers as getTeamPlayersRequest,
	updateMyStadium as updateMyStadiumRequest,
	fetchTeam as fetchTeamRequest,
	fetchFinances as fetchFinancesRequest,
} from './api';
import generalAction from '../utils/logic/generalAction';

export const getMyTeam = () => async (dispatch) => {
	try {
		// dispatch(Creators.fetchMyTeamRequest());
		const { response, error } = await getMyTeamRequest();
		if (!error) {
			dispatch(Creators.fetchMyTeamSuccess(response));
			const { id, name, logo, fansHappiness, balance, createAt, players } = response;
			dispatch(TeamsCreators.fetchTeamSuccess({
				id, name, logo, fansHappiness, balance, createAt, players: players.map(p => p.id),
			}));
			dispatch(PlayersCreators.fetchPlayersSuccess(players));
			return { response };
		}

		dispatch(Creators.fetchMyTeamFailure(error));
		return { error };
	} catch (error) {
		dispatch(Creators.fetchMyTeamFailure(error));
		return { error };
	}
};

export const getMyMatches = myTeamId => async (dispatch) => {
	try {
		dispatch(Creators.fetchMyMatchesRequest());
		const { response, error } = await getMyMatchesRequest();
		if (!error) {
			dispatch(Creators.fetchMyMatchesSuccess(response));
			const teams = response.map((match) => {
				const { id, logo, name } = match.host.id !== myTeamId ? match.host : match.guest;
				return { id, logo, name };
			});
			dispatch(TeamsCreators.fetchTeamsSuccess(teams));
			return { response };
		}

		dispatch(Creators.fetchMyMatchesFailure(error));
		return { error };
	} catch (error) {
		dispatch(Creators.fetchMyMatchesFailure(error));
		return { error };
	}
};
export const getTeamsPlayers = teams => async (dispatch) => {
	try {
		dispatch(PlayersCreators.fetchPlayersRequest());
		const promises = teams.map(teamId => getTeamPlayersRequest(teamId));
		const data = await Promise.all(await promises);
		const response = merge(...data.map(request => request.response));
		const error = merge(...data.map(request => request.error));
		if (isEmpty(error)) {
			teams.forEach((teamId, index) => {
				const players = data[index].response.map(player => player.id);
				dispatch(TeamsCreators.addPlayersToTeam(teamId, players));
			});
			dispatch(PlayersCreators.fetchPlayersSuccess(response));
		}
		else
			dispatch(PlayersCreators.fetchPlayersFailure(error));
	} catch (error) {
		dispatch(Creators.fetchPlayersFailure(error));
	}
};

export const updateMyStadium = stadium => async (dispatch) => {
	try {
		dispatch(Creators.updateMyStadiumRequest());
		const { response, error } = await updateMyStadiumRequest(stadium);
		if (!error) {
			dispatch(Creators.updateMyStadiumSuccess(stadium, response.newBalance));
			dispatch(Creators.addFinance({
				id: Date.now(),
				movements: response.expenses * -1,
				type: 'Stadium',
				created_at: Date.now(),
				client: null,
				newest: true,
			}));
			return { response };
		}
		dispatch(Creators.updateMyStadiumFailure(error.message || 'Hubo un problema mejorando el estadio, intentalo mas tarde.'));
		return { error };
	} catch (error) {
		dispatch(Creators.updateMyStadiumFailure(error));
		return { error };
	}
};

export const fetchTeam = teamId => async (dispatch) => {
	try {
		dispatch(TeamsCreators.fetchTeamRequest());
		const { response, error } = await fetchTeamRequest(teamId);
		if (!error) {
			const { players, ...info } = response;
			dispatch(TeamsCreators.fetchTeamSuccess({ ...info, players: players.map(p => p.id) }));
			dispatch(PlayersCreators.fetchPlayersSuccess(players));
			return { response };
		}
		dispatch(TeamsCreators.fetchTeamFailure('Hubo un problema obteniendo el equipo, intentalo mas tarde.'));
		return { error };
	} catch (error) {
		dispatch(Creators.updateMyStadiumFailure(error));
		return { error };
	}
};

export const fetchFinances = () => async dispatch => generalAction(
	[],
	Creators.fetchFinancesRequest,
	Creators.fetchFinancesSuccess,
	Creators.fetchFinancesFailure,
	fetchFinancesRequest,
)(dispatch);

