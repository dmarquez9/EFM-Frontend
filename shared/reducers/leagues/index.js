import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/leagues';

export const INITIAL_STATE = {};

export const success = (state, { league }) => ({ ...state, [league.id]: league });

export const HANDLERS = {
	[Types.FETCH_LEAGUE_SUCCESS]: success,
};

export default createReducer(INITIAL_STATE, HANDLERS);
