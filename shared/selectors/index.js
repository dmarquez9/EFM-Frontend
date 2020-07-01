import { createSelector } from 'reselect';
import { get, isEmpty } from 'lodash';

export const getTeams = ({ entities }) => get(entities, 'teams.byId');
export const getPlayers = ({ entities }) => get(entities, 'players.byId');

export const getMyMatchesRequest = ({ requests }) => requests.myMatches;
export const getMyMatches = ({ user }) => get(user, 'matches', []);
export const getDivisionRequest = ({ requests }) => requests.division;
export const getRequestStatus = entity => ({ requests }) => get(requests, entity, {});
export const getTeamRequest = ({ requests }) => requests.team;
export const getTeamPlayersRequest = ({ requests }) => requests.teamPlayers;
export const getReportMatchRequest = ({ requests }) => requests.reportMatch;
export const getMarketRequest = ({ requests }) => requests.market;
export const getVerifyMatchRequest = ({ requests }) => requests.verifyMatch;
export const getMyTeam = ({ user }) => get(user.team, 'team', {});
export const getMyUserData = ({ user }) => get(user, 'data', {});
export const getMyTeamRequest = ({ user }) => user.team;
export const getTeam = (state, teamId) => get(getTeams(state), teamId, {});
export const getLeague = ({ leagues }, leagueId) => get(leagues, leagueId, null);
export const getSeason = ({ seasons }, seasonId) => get(seasons, seasonId, null);
export const getDivision = ({ divisions, ...restState }, divisionId) => {
	const division = get(divisions, divisionId, null);
	if (division)
		return {
			...division,
			league: getLeague(restState, division.leagueId),
		};
	return null;
};

const playersIdsByTeam = createSelector(
	getTeam, team => get(team, 'players', null),
);
export const getPlayersFromTeam = createSelector(
	[getPlayers, playersIdsByTeam], (players, teamPlayers) => {
		if (!teamPlayers)
			return null;
		else if (!isEmpty(players) && teamPlayers.length > 0)
			return teamPlayers
				.map(playerId => get(players, playerId, {}))
				.filter(player => !isEmpty(player));
		return [];
	},
);

export const getPlayer = createSelector(
	[getPlayers, (_, playerId) => playerId], (players, playerId) => get(players, playerId, {}),
);
