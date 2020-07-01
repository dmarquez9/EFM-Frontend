import { createActions } from 'reduxsauce';
import { PREFIX } from './constants';

const { Types, Creators } = createActions({
	fetchOffersByMeRequest: [],
	fetchOffersByMeSuccess: ['offers'],
	fetchOffersByMeFailure: ['error'],
	fetchOffersToMeRequest: [],
	fetchOffersToMeSuccess: ['offers'],
	fetchOffersToMeFailure: ['error'],
	fetchMarketRequest: [],
	fetchMarketSuccess: ['availables'],
	fetchMarketFailure: ['error'],
	postInMarketRequest: [],
	postInMarketSuccess: ['playerId', 'condition'],
	postInMarketFailure: ['error'],
	offerPlayerRequest: [],
	offerPlayerSuccess: [],
	offerPlayerFailure: ['error'],
	rejectOfferRequest: [],
	rejectOfferSuccess: ['offerId'],
	rejectOfferFailure: ['error'],
	approveOfferRequest: [],
	approveOfferSuccess: ['entry'],
	approveOfferFailure: ['error'],
}, { prefix: PREFIX });

export { Types, Creators };
