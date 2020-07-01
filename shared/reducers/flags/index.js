import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/flags';

export const INITIAL_STATE = {
	currentSeason: null,
};

export const changeCurrentSeason = (state, { seasonId }) => ({ ...state, currentSeason: seasonId });

export const HANDLERS = {
	[Types.CHANGE_CURRENT_SEASON]: changeCurrentSeason,
};

export default createReducer(INITIAL_STATE, HANDLERS);
