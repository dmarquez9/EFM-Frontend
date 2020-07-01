import { createReducer } from 'reduxsauce';
import { get } from 'lodash';
import { Types } from '../../creatorsTypes/teams';
import { addManyById, addById, initialState } from './helpers';

export const INITIAL_STATE = initialState();

const addTeamsById = addManyById('teams');
const addTeamById = addById('team');

const addPlayersToTeam = (state, { teamId, players }) => {
	const team = get(state.byId, teamId, {});
	const teamPlayers = team.players || [];
	return {
		...state,
		byId: {
			...state.byId,
			[teamId]: {
				...team, players: [...teamPlayers, ...players],
			},
		},
	};
};
export const HANDLERS = {
	[Types.FETCH_TEAMS_SUCCESS]: addTeamsById,
	[Types.FETCH_TEAM_SUCCESS]: addTeamById,
	[Types.ADD_PLAYERS_TO_TEAM]: addPlayersToTeam,

};

export default createReducer(INITIAL_STATE, HANDLERS);
