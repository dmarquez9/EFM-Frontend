import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/authentication';
import { defaultStatus, processingStatus, successStatus, failureStatus } from './helpers';

export const INITIAL_STATE = defaultStatus();

export const HANDLERS = {
	[Types.LOGIN_REQUEST]: processingStatus,
	[Types.LOGIN_SUCCESS]: successStatus,
	[Types.LOGIN_FAILURE]: failureStatus,
	[Types.LOGOUT]: defaultStatus,
};

export default createReducer(INITIAL_STATE, HANDLERS);
