import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/teams';
import { defaultStatus, processingStatus, successStatus, failureStatus } from './helpers';

export const INITIAL_STATE = defaultStatus();

export const HANDLERS = {
	[Types.FETCH_TEAM_REQUEST]: processingStatus,
	[Types.FETCH_TEAM_SUCCESS]: successStatus,
	[Types.FETCH_TEAM_FAILURE]: failureStatus,
};

export default createReducer(INITIAL_STATE, HANDLERS);
