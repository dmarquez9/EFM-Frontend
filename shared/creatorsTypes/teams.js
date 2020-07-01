import { createActions } from 'reduxsauce';
import { PREFIX } from './constants';

const { Types, Creators } = createActions({
	fetchTeamsRequest: [],
	fetchTeamsSuccess: ['teams'],
	fetchTeamsFailure: ['error'],
	fetchTeamRequest: [],
	fetchTeamSuccess: ['team'],
	fetchTeamFailure: ['error'],
	addPlayersToTeam: ['teamId', 'players'],
}, { prefix: PREFIX });

export { Types, Creators };
