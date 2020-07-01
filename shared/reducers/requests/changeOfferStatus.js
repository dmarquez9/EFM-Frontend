import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/market';
import { defaultStatus, processingStatus, successStatus, failureStatus } from './helpers';

export const INITIAL_STATE = defaultStatus();

export const HANDLERS = {
	[Types.REJECT_OFFER_REQUEST]: processingStatus,
	[Types.REJECT_OFFER_SUCCESS]: successStatus,
	[Types.REJECT_OFFER_FAILURE]: failureStatus,
	[Types.APPROVE_OFFER_REQUEST]: processingStatus,
	[Types.APPROVE_OFFER_SUCCESS]: successStatus,
	[Types.APPROVE_OFFER_FAILURE]: failureStatus,
};

export default createReducer(INITIAL_STATE, HANDLERS);
