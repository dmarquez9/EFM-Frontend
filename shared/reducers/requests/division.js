import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/leagues';
import { defaultStatus, processingStatus, successStatus, failureStatus } from './helpers';

export const INITIAL_STATE = defaultStatus();

export const HANDLERS = {
	[Types.FETCH_DIVISION_REQUEST]: processingStatus,
	[Types.FETCH_DIVISION_SUCCESS]: successStatus,
	[Types.FETCH_DIVISION_FAILURE]: failureStatus,
};

export default createReducer(INITIAL_STATE, HANDLERS);
