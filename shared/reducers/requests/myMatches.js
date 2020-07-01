import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/myTeam';
import { defaultStatus, processingStatus, successStatus, failureStatus } from './helpers';

export const INITIAL_STATE = defaultStatus();

export const HANDLERS = {
	[Types.FETCH_MY_MATCHES_REQUEST]: processingStatus,
	[Types.FETCH_MY_MATCHES_SUCCESS]: successStatus,
	[Types.FETCH_MY_MATCHES_FAILURE]: failureStatus,
};

export default createReducer(INITIAL_STATE, HANDLERS);
