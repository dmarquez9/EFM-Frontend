import React, { PureComponent } from 'react';
import { object, bool } from 'prop-types';
import { isEmpty } from 'lodash';
import { compose } from 'redux';
import moment from 'moment';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import { fetchTeam as fetchTeamAction } from '../../actions/teams';
import {
	getTeam,
	getTeamRequest,
	getMyTeam as getMyTeamSelector,
	getMyMatches,
	getPlayersFromTeam,
	getMyUserData,
} from '../../selectors';
import { PROCESSING } from '../../constants/requestStatuses';
import { LoadingBox, Team } from '../../components';

class TeamRoute extends PureComponent {
	render() {
		const { team, fetching, myUser } = this.props;
		if (fetching)
			return <LoadingBox />;
		else if (!isEmpty(team))
			return <Team team={team} myUser={myUser} />;
		return null;
	}
}

const isMyTeam = (myTeam, state, fetching, myUser) => {
	const startDate = moment().subtract(30, 'days');
	const endDate = moment().add(14, 'days');
	return {
		team: {
			...myTeam,
			matches: getMyMatches(state)
				.filter(m =>
					moment(m.match.date)
						.isBetween(startDate, endDate),
				)
				.slice(0, 10),
			user: state.user.data,
		},
		fetching,
		myUser,
	};
};

const mapStateToProps = (state, { match }) => {
	const myTeam = getMyTeamSelector(state);
	const myUser = getMyUserData(state);
	const fetching = getTeamRequest(state).status === PROCESSING;
	if (typeof myTeam.id !== 'undefined' && Number(myTeam.id) === Number(match.params.team_id)) {
		return isMyTeam(myTeam, state, fetching, myUser);
	}
	let team = getTeam(state, match.params.team_id);
	if (team.stadium && team.players)
		team = {
			...team,
			players: getPlayersFromTeam(state, team.id),
			matches: team.matches,
		};
	else
		team = { };
	return { team, fetching, myUser };
};

TeamRoute.propTypes = {
	team: object,
	myUser: object,
	fetching: bool.isRequired,
};

TeamRoute.defaultProps = {
	team: {},
	myUser: {},
};

export default compose(
	connect(mapStateToProps, { fetchTeam: fetchTeamAction }),
	withJob({
		work: ({ team, match, fetchTeam }) => {
			if (!isEmpty(team))
				return true;
			return fetchTeam(match.params.team_id);
		},
		LoadingComponent: () => <LoadingBox />,
		shouldWorkAgain: (prevProps, nextProps) =>
			prevProps.match.params.team_id !== nextProps.match.params.team_id,
	}),
)(TeamRoute);
