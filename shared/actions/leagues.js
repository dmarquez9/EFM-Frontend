import generalAction from '../utils/logic/generalAction';
import { Creators } from '../creatorsTypes/leagues';
import { Creators as FlagsCreators } from '../creatorsTypes/flags';

import {
	fetchSeason as fetchSeasonRequest,
	fetchDivision as fetchDivisionRequest,
} from '../actions/api';

export const fetchSeason = (id, divisionId) => async dispatch => generalAction(
	[id, divisionId],
	Creators.fetchSeasonRequest,
	Creators.fetchSeasonSuccess,
	Creators.fetchSeasonFailure,
	fetchSeasonRequest,
)(dispatch);

export const fetchDivision = (leagueId, divisionId) => async (dispatch) => {
	try {
		dispatch(Creators.fetchDivisionRequest());
		const { response, error } = await fetchDivisionRequest(leagueId, divisionId);
		if (!error) {
			const lastSeason = response.seasons[response.seasons.length - 1];
			if (lastSeason) {
				await fetchSeason(lastSeason.id, divisionId)(dispatch);
				dispatch(FlagsCreators.changeCurrentSeason(lastSeason.id));
			}
			dispatch(Creators.fetchDivisionSuccess({
				id: response.division.id,
				logo: response.division.logo,
				name: response.division.name,
				leagueId: response.id,
				seasons: response.seasons,
			}));
			dispatch(Creators.fetchLeagueSuccess({
				id: response.id,
				logo: response.logo,
				name: response.name,
			}));
			return { response };
		}
		dispatch(Creators.fetchDivisionFailure(error));
		return { error };
	} catch (error) {
		dispatch(Creators.fetchDivisionFailure(error));
		return { error };
	}
};
