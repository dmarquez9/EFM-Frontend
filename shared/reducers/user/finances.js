import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/myTeam';
import { Types as MarketTypes } from '../../creatorsTypes/market';

const INITIAL_STATE = [];

const success = (_, { finances }) => finances;

const addFinance = (state, { finance }) => [finance, ...state];

const approveOfferSuccess = (state, { entry }) => {
	const finance = {
		id: Date.now(),
		type: 'Market',
		movements: entry.offer.price,
		client: entry.offer.teamName,
		created_at: Date.now(),
	};
	return [finance, ...state];
};

export const HANDLERS = {
	[Types.FETCH_FINANCES_SUCCESS]: success,
	[Types.ADD_FINANCE]: addFinance,
	[MarketTypes.APPROVE_OFFER_SUCCESS]: approveOfferSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS);
