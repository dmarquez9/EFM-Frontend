import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/market';
import { defaultStatus, processingStatus, successStatus, failureStatus } from './helpers';

export const INITIAL_STATE = defaultStatus();

export const HANDLERS = {
	[Types.OFFER_PLAYER_REQUEST]: processingStatus,
	[Types.OFFER_PLAYER_SUCCESS]: successStatus,
	[Types.OFFER_PLAYER_FAILURE]: failureStatus,
};

export default createReducer(INITIAL_STATE, HANDLERS);
