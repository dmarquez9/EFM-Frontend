import React, { PureComponent } from 'react';
import { object, bool, array } from 'prop-types';
import { groupBy, values, isEmpty } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import { fetchDivision as fetchDivisionAction } from '../../actions/leagues';
import { getSeason, getDivision, getDivisionRequest } from '../../selectors';
import { PROCESSING } from '../../constants/requestStatuses';
import { League, LoadingBox } from '../../components';

class Season extends PureComponent {
	render() {
		const { season, division, fetching, matches } = this.props;
		if (fetching)
			return <LoadingBox />;
		else if (!season)
			return null;
		return (
			<League
				division={division}
				positions={season.positions}
				bestScorers={season.scorers.bestGoalsScorer}
				matches={matches}
				bestAssisters={season.scorers.bestAssistsScorer}
			/>
		);
	}
}

const mapStateToProps = (state, { match }) => {
	const season = getSeason(state, state.flags.currentSeason);
	const division = getDivision(state, match.params.division_id);
	const fetching = getDivisionRequest(state).status === PROCESSING;
	let matches = [];
	if (!isEmpty(season))
		matches = values(groupBy(season.matches, e => e.match.date));
	return {
		season,
		division,
		fetching,
		matches,
	};
};

const mapDispatchToProps = {
	fetchDivision: fetchDivisionAction,
};

Season.propTypes = {
	division: object,
	season: object,
	matches: array,
	fetching: bool.isRequired,
};

Season.defaultProps = {
	season: {},
	matches: [],
	division: {},
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withJob({
		work: ({ match, season, division, fetchDivision }) => {
			if (season && division)
				return true;
			return fetchDivision(match.params.league_id, match.params.division_id);
		},
		LoadingComponent: () => <LoadingBox />,
		shouldWorkAgain: (prevProps, nextProps) =>
			prevProps.match.params.season_id !== nextProps.match.params.season_id,
	}),
)(Season);
