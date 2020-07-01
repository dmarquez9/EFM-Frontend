import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { bool, func, object } from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';

import TeamInfo from './TeamInfo';
import General from './General';
import Matches from './Matches';
import Stadium from './Stadium';
import MarketPlace from '../MarketPlace';
import Finances from './Finances';

import styles from './styles.scss';

import LoadingBox from '../LoadingBox';

import { getMyTeam as getMyTeamAction } from '../../actions/teams';

const style = {
	inkBar: {
		height: '0px',
	},
	container: {
		backgroundColor: 'transparent',
	},
	activeTab: {
		color: '#f93b78',
	},
	defaultTab: {
		color: '#000',
	},
};

class MyTeam extends PureComponent {
	state = { slideIndex: 0, loaded: false };
	componentDidUpdate = (prevProps) => {
		if (prevProps.fetching && !this.props.fetching)
			this.setState({ loaded: true });
	}
	componentDidMount = () => {
		const { team, getMyTeam } = this.props;
		if (isEmpty(team)) getMyTeam();
	}
	handleChange = value => this.setState({ slideIndex: value })

	getStyle = isActive => (isActive ? style.activeTab : style.defaultTab);

	getTabContent = (tabIndex) => {
		switch (tabIndex) {
		case 0:
			return (
				<div className={styles.container}>
					<div className={styles.TeamContent}>
						<General team={this.props.team} />
					</div>
				</div>
			);
		case 1:
			return <Matches myTeamId={this.props.team.id} />;
		case 2:
			return (
				<div className={styles.container}>
					<div className={styles.TeamContent}>
						<Finances />
					</div>
				</div>
			);
		case 3:
			return (
				<div className={styles.container}>
					<div className={styles.TeamContent}>
						<MarketPlace />
					</div>
				</div>
			);
		case 4:
			return (
				<div className={styles.container}>
					<div className={styles.TeamContent}>
						<Stadium stadium={this.props.team.stadium} />
					</div>
				</div>
			);
		default:
			return 'Tab not selected';
		}
	};
	render() {
		const { slideIndex, loaded } = this.state;
		const { fetching, team, user, error } = this.props;
		const loadedEmpty = loaded && isEmpty(team);
		if (fetching && isEmpty(team))
			return <LoadingBox />;
		else if (!isEmpty(team))
			return (
				<div>
					<Helmet>
						<title>EFM | Mi equipo</title>
					</Helmet>
					<TeamInfo team={team} user={user} />
					<div className={styles.TeamTabs}>
						<div className={styles.container}>
							<Tabs
								onChange={this.handleChange}
								value={this.state.slideIndex}
								inkBarStyle={style.inkBar}
								tabItemContainerStyle={style.container}
							>
								<Tab
									style={this.getStyle(slideIndex === 0)}
									className={styles.TeamTab}
									label="General"
									value={0}
								/>
								<Tab
									style={this.getStyle(slideIndex === 1)}
									className={styles.TeamTab}
									label="Partidos"
									value={1}
								/>
								<Tab
									style={this.getStyle(slideIndex === 2)}
									className={styles.TeamTab}
									label="Finanzas"
									value={2}
								/>
								<Tab
									style={this.getStyle(slideIndex === 3)}
									className={styles.TeamTab}
									label="Mercado"
									value={3}
								/>
								<Tab
									style={this.getStyle(slideIndex === 4)}
									className={styles.TeamTab}
									label="Estadio"
									value={4}
								/>
							</Tabs>
						</div>
					</div>
					{this.getTabContent(slideIndex)}
				</div>
			);
		else if (loadedEmpty || !isEmpty(error))
			return (
				<div className={styles.noTeam}>
					<img src="noteam.png" alt="*" />
					<h2>No tienes un equipo</h2>
					<p>Al parecer todavia no tienes un equipo asignado. Intenta mas tarde.</p>
				</div>
			);
		return null;
	}
}

MyTeam.propTypes = {
	fetching: bool.isRequired,
	team: object,
	user: object.isRequired,
	getMyTeam: func.isRequired,
	error: object,
};

MyTeam.defaultProps = {
	team: {},
	error: {},
};

const mapStateToProps = state => ({
	...state.user.team,
	user: state.user.data,
});

export default connect(mapStateToProps, { getMyTeam: getMyTeamAction })(MyTeam);
