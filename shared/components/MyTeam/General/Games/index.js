import React, { PureComponent } from 'react';
import { array, func, string, number } from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles.scss';
import Game from '../../../Game';
import { PROCESSING } from '../../../../constants/requestStatuses';
import { getMyMatchesRequest, getMyTeam } from '../../../../selectors';
import { getMyMatches as getMyMatchesAction } from '../../../../actions/teams';

class Games extends PureComponent {
	componentDidMount = () => {
		this.props.getMyMatches(this.props.myTeamId);
	}
	render() {
		return (
			<div className={styles.Games}>
				<h4>Partidos</h4>
				{this.props.matches.map(match => (
					<div key={match.match.id}>
						<Game
							competition={this.props.competition}
							home={match.host}
							away={match.guest}
							date={match.match.date}
						/>
					</div>
				))}
			</div>
		);
	}
}
Games.propTypes = {
	getMyMatches: func.isRequired,
	competition: string.isRequired,
	matches: array.isRequired,
	myTeamId: number.isRequired,
};

const mapStateToProps = (state) => {
	const matches = state.user.matches.filter((m) => {
		const pending = m.host.verification === null && m.guest.verification === null;
		return pending || m.match.played;
	});
	return {
		matches: matches.slice(0, 3),
		myTeamId: getMyTeam(state).id,
		fetching: getMyMatchesRequest(state).status === PROCESSING,

	};
};

export default connect(mapStateToProps, { getMyMatches: getMyMatchesAction })(Games);
