import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/market';
import { defaultStatus, processingStatus, successStatus, failureStatus } from './helpers';

export const INITIAL_STATE = defaultStatus();

export const HANDLERS = {
	[Types.FETCH_OFFERS_TO_ME_REQUEST]: processingStatus,
	[Types.FETCH_OFFERS_TO_ME_SUCCESS]: successStatus,
	[Types.FETCH_OFFERS_TO_ME_FAILURE]: failureStatus,
};

export default createReducer(INITIAL_STATE, HANDLERS);
