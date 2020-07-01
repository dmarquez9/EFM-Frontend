import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/market';
import { defaultStatus, processingStatus, successStatus, failureStatus } from './helpers';

export const INITIAL_STATE = defaultStatus();

export const HANDLERS = {
	[Types.POST_IN_MARKET_REQUEST]: processingStatus,
	[Types.POST_IN_MARKET_SUCCESS]: successStatus,
	[Types.POST_IN_MARKET_FAILURE]: failureStatus,
};

export default createReducer(INITIAL_STATE, HANDLERS);
