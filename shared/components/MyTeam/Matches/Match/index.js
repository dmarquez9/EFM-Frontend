import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { isEmpty, capitalize } from 'lodash';
import { Tabs, Tab } from 'material-ui/Tabs';
import moment from 'moment';
import { RaisedButton, TextField } from 'material-ui';
import { object, func, bool, number } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.scss';
import { getPlayer, getTeamPlayersRequest } from '../../../../selectors';
import { getTeamsPlayers as getTeamsPlayersAction } from '../../../../actions/teams';
import { verifyMatch as verifyMatchAction } from '../../../../actions/matches';

import { PROCESSING } from '../../../../constants/requestStatuses';
import LoadingBox from '../../../LoadingBox';
import bindInput from '../../../../utils/logic/bindInput';

const style = {
	inkBar: {
		backgroundColor: '#5a83ff',
	},
	activeTab: {
		color: '#5a83ff',
	},
	defaultTab: {
		color: '#000',
	},
	container: {
		backgroundColor: '#e9e9e9',
		padding: '20px',
	},
	tab: {
		backgroundColor: '#fff',
	},
};

class Match extends PureComponent {
	state = { slideIndex: 0, description: '' };
	handlePlayersTeam = () => {
		const {
			match: {
				host: { id: hostId, scorers: hostScorers },
				guest: { id: guestId, scorers: guestScorers },
			},
			getTeamsPlayers,
		} = this.props;
		const emptyHostScorers = hostScorers.filter(s => !s.player.id).length > 0;
		const emptyGuestScorers = guestScorers.filter(s => !s.player.id).length > 0;
		if (emptyHostScorers || emptyGuestScorers) {
			const teams = [];
			if (emptyGuestScorers) teams.push(guestId);
			if (emptyHostScorers) teams.push(hostId);
			getTeamsPlayers(teams);
		}
	}
	componentDidUpdate = ({ match: { host: { id: prevHostId }, guest: { id: prevGuestId } } }) => {
		const {
			match: { host: { id: hostId }, guest: { id: guestId } },
		} = this.props;
		if (hostId !== prevHostId || guestId !== prevGuestId) {
			this.setState({ description: '' });
			this.handlePlayersTeam();
		}
	}
	componentDidMount = () => {
		this.handlePlayersTeam();
	}
	handleChange = value => this.setState({ slideIndex: value })
	getStyle = isActive => (isActive ? style.activeTab : style.defaultTab);
	renderScorer = (scorer, id) => (
		<div key={id} className={styles.player}>
			<div className={styles.image} style={{ backgroundImage: `url(${scorer.photo})` }} />
			{scorer.name}
			<div className={styles.stats}>
				{scorer.goals > 0 && (
					<div className={styles.iconLabel}>
						<FontAwesomeIcon
							key={`${scorer.name}-goals-${id}`}
							icon="futbol"
						/>
						{scorer.goals > 1 && <small className={styles.label}>x{scorer.goals}</small>}
					</div>
				)}
				{scorer.assists > 0 && (
					<div className={styles.iconLabel}>
						<FontAwesomeIcon
							key={`${scorer.name}-assists-${id}`}
							icon="hands-helping"
						/>
						{scorer.assists > 1 && <small className={styles.label}>x{scorer.assists}</small>}
					</div>
				)}
			</div>
		</div>
	)

	onVerify = verification => () => {
		let data = {
			myTeamId: this.props.myTeamId,
			verification,
			match: this.props.match,
		};
		if (!isEmpty(this.state.description))
			data.description = this.state.description;
		this.props.veriyfyMatch(data);
	}
	renderActionButtons = () => {
		const { match, myTeamId, fetchingVerification } = this.props;
		const hostVerified = match.host.verification && match.host.id !== myTeamId
			&& !match.match.played;
		const guestVerified = match.guest.verification && match.guest.id !== myTeamId
			&& !match.match.played;
		if (hostVerified || guestVerified)
			return (
				<div className={styles.buttons}>
					<TextField
						hintText="Descripcion"
						value={this.state.description}
						onChange={bindInput(this, 'description')}
						fullWidth
					/>
					<RaisedButton
						onClick={this.onVerify(true)}
						className={styles.btnTrue}
						label="Aceptar resultado"
						disabled={fetchingVerification}
					/>
					<RaisedButton
						onClick={this.onVerify(false)}
						className={styles.btnFalse}
						label="Rechazar resultado"
						disabled={fetchingVerification}
					/>
				</div>
			);
		else if (match.match.played)
			return null;
		return (
			<div className={styles.approval}>
				<div>
					<FontAwesomeIcon icon="clock" />
					Esperando por la Verificacion del contrincante
				</div>
			</div>
		);
	}
	render() {
		const { match, fetchingPlayers } = this.props;
		const { slideIndex } = this.state;
		const date = moment(match.match.date);
		return (
			<div className={styles.matchdetail}>
				{fetchingPlayers && <LoadingBox showPaper={false} />}
				{!fetchingPlayers && (
					<div>
						<div className={styles.top}>
							<div className={styles.team}>
								<img src={match.host.logo} alt={match.host.name} />
								<span>{match.host.name}</span>
							</div>
							<div className={styles.detail}>
								<span>{capitalize(date.format('MMM DD'))} <strong>{date.format('HH:mm')}</strong></span>
								<span className={styles.score}>{`${match.host.goals}-${match.guest.goals}`}</span>
								<span><strong>Estadio:</strong> {match.match.stadium.name}</span>
							</div>
							<div className={styles.team}>
								<img src={match.guest.logo} alt={match.guest.name} />
								<span>{match.guest.name}</span>
							</div>
						</div>
						{this.renderActionButtons()}
						{(match.host.scorers.length > 0 || match.guest.scorers.length > 0) && (
							<Tabs
								contentContainerStyle={style.container}
								onChange={this.handleChange}
								value={this.state.slideIndex}
								inkBarStyle={style.inkBar}
								tabItemContainerStyle={style.tab}
							>
								<Tab
									label="estadisticas"
									className={styles.TeamTab}
									style={this.getStyle(slideIndex === 0)}
									value={0}
								>
									<div className={styles.players}>
										<div>
											{match.host.scorers.map((scorer, index) => this.renderScorer(scorer.player, `${match.match.id}-${scorer.id || index}`))}
										</div>
										<div>
											{match.guest.scorers.map((scorer, index) => this.renderScorer(scorer.player, `${match.match.id}-${scorer.id || index}`))}
										</div>
									</div>
								</Tab>
							</Tabs>
						)}
					</div>
				)}

			</div>
		);
	}
}

Match.propTypes = {
	match: object.isRequired,
	getTeamsPlayers: func.isRequired,
	fetchingPlayers: bool.isRequired,
	myTeamId: number.isRequired,
	veriyfyMatch: func.isRequired,
	fetchingVerification: bool.isRequired,
};
const mapStateToProps = (state, { match }) => ({
	match: {
		...match,
		host: {
			...match.host,
			scorers: match.host.scorers.map((p) => {
				const { id, name, photo } = getPlayer(state, p.player.id);
				return { ...p, player: { ...p.player, id, name, photo } };
			}),
		},
		guest: {
			...match.guest,
			scorers: match.guest.scorers.map((p) => {
				const { id, name, photo } = getPlayer(state, p.player.id);
				return { ...p, player: { ...p.player, id, name, photo } };
			}),
		},
	},
	fetchingPlayers: getTeamPlayersRequest(state).status === PROCESSING,
});

export default connect(mapStateToProps, {
	getTeamsPlayers: getTeamsPlayersAction,
	veriyfyMatch: verifyMatchAction,
})(Match);
