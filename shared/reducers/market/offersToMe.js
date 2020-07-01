import { createReducer } from 'reduxsauce';
import { unionBy } from 'lodash';
import { Types } from '../../creatorsTypes/market';

const INITIAL_STATE = [];

const fetchOffersSuccess = (state, { offers }) => offers;

const rejectOfferSuccess = (state, { offerId }) => {
	const offerIndex = state.findIndex(e => e.offer.id === offerId);
	if (isNaN(offerIndex))
		return state;
	const entry = { ...state[offerIndex] };
	entry.offer.state = 'declined';
	return unionBy(state, [entry], 'offer.id');
};
const approveOfferSuccess = (state, { entry }) => {
	const news = state.map((s) => {
		if (s.id === entry.id)
			return { ...s, offer: { ...s.offer, state: s.offer.id === entry.offer.id ? 'approved' : 'declined' } };
		return s;
	});
	return news;
};
export const HANDLERS = {
	[Types.FETCH_OFFERS_TO_ME_SUCCESS]: fetchOffersSuccess,
	[Types.REJECT_OFFER_SUCCESS]: rejectOfferSuccess,
	[Types.APPROVE_OFFER_SUCCESS]: approveOfferSuccess,

};

export default createReducer(INITIAL_STATE, HANDLERS);
