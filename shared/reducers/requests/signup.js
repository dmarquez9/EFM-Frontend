import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/authentication';
import { defaultStatus, processingStatus, successStatus, failureStatus } from './helpers';

export const INITIAL_STATE = defaultStatus();

export const HANDLERS = {
	[Types.SIGNUP_REQUEST]: processingStatus,
	[Types.SIGNUP_SUCCESS]: successStatus,
	[Types.SIGNUP_FAILURE]: failureStatus,
	[Types.LOGIN_SUCCESS]: defaultStatus,
};

export default createReducer(INITIAL_STATE, HANDLERS);
