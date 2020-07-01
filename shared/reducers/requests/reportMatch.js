import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/myTeam';
import { defaultStatus, processingStatus, successStatus, failureStatus } from './helpers';

export const INITIAL_STATE = defaultStatus();

export const HANDLERS = {
	[Types.REPORT_MATCH_REQUEST]: processingStatus,
	[Types.REPORT_MATCH_SUCCESS]: successStatus,
	[Types.REPORT_MATCH_FAILURE]: failureStatus,
};

export default createReducer(INITIAL_STATE, HANDLERS);
