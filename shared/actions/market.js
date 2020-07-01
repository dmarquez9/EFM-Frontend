import generalAction from '../utils/logic/generalAction';
import { Creators } from '../creatorsTypes/market';

import {
	fetchOffersToMe as fetchOffersToMeRequest,
	fetchOffersByMe as fetchOffersByMeRequest,
	fetchMarket as fetchMarketRequest,
	postInMarket as postInMarketRequest,
	removeInMarket as removeInMarketRequest,
	offerPlayer as offerPlayerRequest,
	updateOfferStatus,
} from '../actions/api';

export const fetchOffersByMe = () => async dispatch => generalAction(
	[],
	Creators.fetchOffersByMeRequest,
	Creators.fetchOffersByMeSuccess,
	Creators.fetchOffersByMeFailure,
	fetchOffersByMeRequest,
)(dispatch);
export const fetchOffersToMe = () => async dispatch => generalAction(
	[],
	Creators.fetchOffersToMeRequest,
	Creators.fetchOffersToMeSuccess,
	Creators.fetchOffersToMeFailure,
	fetchOffersToMeRequest,
)(dispatch);

export const fetchMarketAvailables = () => async dispatch => generalAction(
	[],
	Creators.fetchMarketRequest,
	Creators.fetchMarketSuccess,
	Creators.fetchMarketFailure,
	fetchMarketRequest,
)(dispatch);

export const updateInMarket = ({ playerId, description, condition }) => async (dispatch) => {
	try {
		dispatch(Creators.postInMarketRequest());
		const { response, error } = await condition ?
			postInMarketRequest(playerId, description) :
			removeInMarketRequest(playerId);
		if (!error) {
			dispatch(Creators.postInMarketSuccess(playerId, condition));
			return { response };
		}
		dispatch(Creators.postInMarketFailure(error));
		return { error };
	} catch (error) {
		dispatch(Creators.postInMarketFailure(error));
		return { error };
	}
};

export const offerPlayer = (price, marketId, playersId) => async dispatch => generalAction(
	[price, marketId, playersId],
	Creators.offerPlayerRequest,
	Creators.offerPlayerSuccess,
	Creators.offerPlayerFailure,
	offerPlayerRequest,
)(dispatch);

export const rejectOffer = (marketId, offerId) => async (dispatch) => {
	try {
		dispatch(Creators.rejectOfferRequest());
		const { response, error } = await updateOfferStatus(marketId, offerId, 'declined');
		if (!error) {
			dispatch(Creators.rejectOfferSuccess(offerId));
			return { response };
		}
		dispatch(Creators.rejectOfferFailure(error.message || JSON.stringify(error)));
		return { error };
	} catch (error) {
		dispatch(Creators.postInMarketFailure(error.message || JSON.stringify(error)));
		return { error };
	}
};

export const approveOffer = entry => async (dispatch) => {
	try {
		dispatch(Creators.approveOfferRequest());
		const { response, error } = await updateOfferStatus(entry.id, entry.offer.id, 'approved');
		if (!error) {
			dispatch(Creators.approveOfferSuccess(entry));
			return { response };
		}
		dispatch(Creators.approveOfferFailure(error.message || JSON.stringify(error)));
		return { error };
	} catch (error) {
		dispatch(Creators.approveMarketFailure(error.message || JSON.stringify(error)));
		return { error };
	}
};