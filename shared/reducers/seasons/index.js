import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/leagues';

export const INITIAL_STATE = {};

export const success = (state, { season }) => ({ ...state, [season.id]: season });

export const HANDLERS = {
	[Types.FETCH_SEASON_SUCCESS]: success,
};

export default createReducer(INITIAL_STATE, HANDLERS);
