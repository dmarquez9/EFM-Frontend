import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/market';

export const INITIAL_STATE = [];

export const fetchOffersSuccess = (state, { offers }) => offers;

export const HANDLERS = {
	[Types.FETCH_OFFERS_BY_ME_SUCCESS]: fetchOffersSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS);
