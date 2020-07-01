import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/players';
import { addManyById, addById, initialState } from './helpers';

export const INITIAL_STATE = initialState();

const addTeamsById = addManyById('players');
const addTeamById = addById('player');

export const HANDLERS = {
	[Types.FETCH_PLAYERS_SUCCESS]: addTeamsById,
	[Types.FETCH_PLAYER_SUCCESS]: addTeamById,
};

export default createReducer(INITIAL_STATE, HANDLERS);
