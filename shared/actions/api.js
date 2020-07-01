import mainAxios from 'axios';
import axios from './axios';
import config from '../../config';

const base = config('apiURL');

const generalGetRequest = url => new Promise(resolve =>
	axios.get(url)
		.then(({ data }) =>
			resolve({ response: data }),
		)
		.catch(({ response }) =>
			resolve({ error: response ? response.data : 'Unexpected error' }),
		),
);
export const signup = user =>
	new Promise(resolve =>
		axios.post('v1/auth/register', { ...user })
			.then(({ data }) =>
				resolve({ response: data }),
			)
			.catch(({ response: { data } }) =>
				resolve({ error: data }),
			),
	);
export const login = (user, password) =>
	new Promise(resolve =>
		axios.post('v1/auth/login', { user, password })
			.then(({ data }) =>
				resolve({ response: data }),
			)
			.catch(({ response: { data } }) =>
				resolve({ error: data }),
			),
	);
export const authByToken = () =>
	new Promise(resolve =>
		axios.get('v1/auth/refresh-token')
			.then(({ data }) => resolve({ response: data }))
			.catch(({ response: { data } }) =>
				resolve({ error: data }),
			),
	);
export const getMyTeam = () =>
	new Promise(resolve =>
		axios.get('v1/me/team')
			.then(({ data }) => resolve({ response: data }))
			.catch(({ response: { data } }) =>
				resolve({ error: data }),
			),
	);
export const getTeamPlayers = teamId => generalGetRequest(`v1/team/${teamId}/players`);

export const getMyMatches = () => generalGetRequest('v1/me/matches');

export const reportMatch = (id, matchInfo) =>
	new Promise(resolve =>
		axios.patch(`v1/me/matches/${id}`, { ...matchInfo })
			.then(({ data }) =>
				resolve({ response: data }),
			)
			.catch(({ response: { data } }) =>
				resolve({ error: data }),
			),
	);
export const fetchSeason = (id, divisionId) =>
	mainAxios
		.get(`v1/season/${id}/division/${divisionId}`, { baseURL: base })
		.then(({ data }) => ({ response: { ...data, id } }))
		.catch(({ response }) => ({ error: response ? response.data : 'Unexpected error' }));

export const fetchDivision = (leagueId, divisionId) =>
	mainAxios
		.get(`v1/leagues/${leagueId}/division/${divisionId}`, { baseURL: base })
		.then(({ data }) => ({ response: data }))
		.catch(({ response }) => ({ error: response ? response.data : 'Unexpected error' }));

export const updateMyStadium = stadium =>
	new Promise(resolve =>
		axios.patch('v1/stadium', { ...stadium })
			.then(({ data }) =>
				resolve({ response: data }),
			)
			.catch(({ response: { data } }) =>
				resolve({ error: data }),
			),
	);

export const verifyMatch = (matchId, verification, description) =>
	new Promise(resolve =>
		axios.patch(`v1/me/matches/${matchId}/verify`, { verification, description })
			.then(({ data }) =>
				resolve({ response: data }),
			)
			.catch(({ response: { data } }) =>
				resolve({ error: data }),
			),
	);
export const fetchTeam = teamId =>
	mainAxios
		.get(`v1/team/${teamId}`, { baseURL: base })
		.then(({ data }) => ({ response: data }))
		.catch(({ response }) => ({ error: response ? response.data : 'Unexpected error' }));

export const fetchOffersToMe = () => generalGetRequest('v1/market/offers');
export const fetchOffersByMe = () => generalGetRequest('v1/market/me/offers');
export const fetchMarket = () => generalGetRequest('v1/market');
export const fetchFinances = () => generalGetRequest('v1/me/finances');

export const postInMarket = (playerId, description) =>
	new Promise(resolve =>
		axios.post('v1/market', { playerId, description })
			.then(({ data }) =>
				resolve({ response: data }),
			)
			.catch(({ response: { data } }) =>
				resolve({ error: data }),
			),
	);
export const offerPlayer = (price, marketId, playersId) =>
	new Promise(resolve =>
		axios.post(`v1/market/${marketId}/offer`, { price, playersId })
			.then(({ data }) =>
				resolve({ response: data }),
			)
			.catch(({ response: { data } }) =>
				resolve({ error: data }),
			),
	);
export const removeInMarket = playerId =>
	new Promise(resolve =>
		axios.delete(`v1/market/${playerId}`)
			.then(({ data }) =>
				resolve({ response: data }),
			)
			.catch(({ response: { data } }) =>
				resolve({ error: data }),
			),
	);

export const updateOfferStatus = (marketId, offerId, status) =>
	new Promise(resolve =>
		axios.patch(`v1/market/${marketId}/offer/${offerId}`, { state: status })
			.then(({ data }) =>
				resolve({ response: data }),
			)
			.catch(({ response: { data } }) =>
				resolve({ error: data }),
			),
	);
