import { createReducer } from 'reduxsauce';
import { Types } from '../../creatorsTypes/market';

export const INITIAL_STATE = [];

export const fetchMarketSuccess = (state, { availables }) => ([...state, ...availables]);

export const HANDLERS = {
	[Types.FETCH_MARKET_SUCCESS]: fetchMarketSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS);
