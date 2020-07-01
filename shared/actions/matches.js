import { Creators } from '../creatorsTypes/myTeam';
import {
	reportMatch as reportMatchRequest,
	verifyMatch as verifyMatchRequest,
} from './api';

export const reportMatch = (id, myTeamId, matchInfo) => async (dispatch) => {
	try {
		dispatch(Creators.reportMatchRequest());
		const { response, error } = await reportMatchRequest(id, matchInfo);
		if (!error) {
			const info = {
				host: {
					id: matchInfo.hostId,
					goals: matchInfo.hostGoals,
					scorers: matchInfo.hostPlayers.map(player => ({ player })),
					verification: matchInfo.hostId === myTeamId ? true : null,
				},
				guest: {
					id: matchInfo.guestId,
					goals: matchInfo.guestGoals,
					scorers: matchInfo.guestPlayers.map(player => ({ player })),
					verification: matchInfo.guestId === myTeamId ? true : null,
				},
			};
			dispatch(Creators.reportMatchSuccess(id, info));
			return { response };
		}
		dispatch(Creators.reportMatchFailure(error));
		return { error };
	} catch (error) {
		dispatch(Creators.reportMatchFailure(error));
		return { error };
	}
};

export const verifyMatch = ({
	match,
	verification,
	description,
}) => async (dispatch) => {
	try {
		dispatch(Creators.verifyMatchRequest());
		const { response, error } = await verifyMatchRequest(match.match.id, verification, description);
		if (!error) {
			dispatch(Creators.verifyMatchSuccess(match.match.id, verification, match));
			return { response };
		}
		dispatch(Creators.verifyMatchFailure('Hubo un problema verificando el resultado, intentalo mas tarde'));
		return { error };
	} catch (error) {
		dispatch(Creators.verifyMatchFailure(error));
		return { error };
	}
};

