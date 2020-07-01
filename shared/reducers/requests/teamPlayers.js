import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/players';
import { defaultStatus, processingStatus, successStatus, failureStatus } from './helpers';

export const INITIAL_STATE = defaultStatus();

export const HANDLERS = {
	[Types.FETCH_PLAYERS_REQUEST]: processingStatus,
	[Types.FETCH_PLAYERS_SUCCESS]: successStatus,
	[Types.FETCH_PLAYERS_FAILURE]: failureStatus,
};

export default createReducer(INITIAL_STATE, HANDLERS);
