import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/leagues';

export const INITIAL_STATE = {};

export const success = (state, { division }) => ({ ...state, [division.id]: division });

export const HANDLERS = {
	[Types.FETCH_DIVISION_SUCCESS]: success,
};

export default createReducer(INITIAL_STATE, HANDLERS);
