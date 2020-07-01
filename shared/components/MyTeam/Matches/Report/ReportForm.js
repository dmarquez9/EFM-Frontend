import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { Checkbox } from 'material-ui';
import { array, object, func, bool, number } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { capitalize, get, omit, isEmpty, values, map } from 'lodash';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import {
	Table,
	TableBody,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import { Scrollbars } from 'react-custom-scrollbars';
import { TextInput, BasicLayout, SubmitButton } from '../../../FormElements';
import styles from './styles.scss';
import { getPlayersFromTeam } from '../../../../selectors';
import isMatchRejected from '../../../../utils/logic/isMatchRejected';
import { getTeamsPlayers as getTeamsPlayersAction } from '../../../../actions/teams';
import style from './style';
import LoadingBox from '../../../LoadingBox';

const INITIAL_STATE = {
	slideIndex: 0,
	hostPlayers: {},
	guestPlayers: {},
	open: false,
};

class ReportForm extends PureComponent {
	state = INITIAL_STATE;

	handlePlayersTeam = () => {
		const {
			guestPlayers,
			hostPlayers,
			getTeamsPlayers,
			match: { host: { id: hostId }, guest: { id: guestId } },
		} = this.props;
		if (!guestPlayers || !hostPlayers) {
			const teams = [];
			if (!guestPlayers) teams.push(guestId);
			if (!hostPlayers) teams.push(hostId);
			getTeamsPlayers(teams);
		}
	}
	componentDidMount = () => {
		this.handlePlayersTeam();
	}
	componentDidUpdate = ({ match: { host: { id: prevHostId }, guest: { id: prevGuestId } } }) => {
		const {
			match: { host: { id: hostId }, guest: { id: guestId } },
		} = this.props;
		if (hostId !== prevHostId || guestId !== prevGuestId) {
			this.setState(INITIAL_STATE);
			this.handlePlayersTeam();
		}
	}

	onChange = value => this.setState({ slideIndex: value })

	getStyle = isActive => (isActive ? styles.activeTab : styles.defaultTab);

	onAddScorer = (player, condition, type) => ({ target: { value } }) => {
		if (!isNaN(Number(value))) {
			const conditionPlayers = `${condition}Players`;
			const scorer = {
				id: player.id,
				[type]: Number(value),
			};
			const existing = this.state[conditionPlayers][player.id]
				|| { goals: 0, assists: 0 };
			const merged = { ...existing, ...scorer };
			this.setState(prevState => ({
				[conditionPlayers]: { ...prevState[conditionPlayers], [player.id]: merged },
			}));
		}
	}

	evalSelectedRow = (condition, playerId) => {
		const player = this.state[`${condition}Players`][playerId];
		return !isEmpty(player);
	}

	onRowSelection = (condition, playerId) => () => {
		const conditionPlayers = `${condition}Players`;
		this.setState(prevState => ({
			[`${condition}Players`]: omit(prevState[conditionPlayers], [playerId]),
		}));
	}

	renderPlayerScorer = (player, teamCondition) => {
		const playerInfo = this.props[`${teamCondition}Players`].find(e => e.id === player.id)
		return (
			<div className={styles.player}>
				<div className={styles.image} style={{ backgroundImage: `url(${playerInfo.photo})` }} />
				{playerInfo.name}
				<div className={styles.stats}>
					{player.goals > 0 && (
						<div className={styles.iconLabel}>
							<FontAwesomeIcon
								icon="futbol"
							/>
							<small className={styles.label}>x{player.goals}</small>
						</div>
					)}
					{player.assists > 0 && (
						<div className={styles.iconLabel}>
							<FontAwesomeIcon
								icon="hands-helping"
							/>
							<small className={styles.label}>x{player.assists}</small>
						</div>
					)}
				</div>
			</div>
		)
	}
	renderPlayersRow = (player, condition, index) => (
		<TableRow key={`${player.id}-${index}`}>
			<TableRowColumn className={styles.colCheckbox}>
				<Checkbox
					checked={this.evalSelectedRow(condition, player.id)}
					onCheck={this.onRowSelection(condition, player.id)}
					style={styles.checkbox}
					disabled={!this.evalSelectedRow(condition, player.id)}
				/>
			</TableRowColumn>
			<TableRowColumn>{player.name}</TableRowColumn>
			<TableRowColumn className={styles.colStats}>
				<TextField
					hintText="goles"
					id="goles"
					type="number"
					underlineShow={false}
					value={get(this.state[`${condition}Players`][player.id], 'goals', '')}
					onChange={this.onAddScorer(player, condition, 'goals')}
					className={styles.inputGoals}
				/>
			</TableRowColumn>
			<TableRowColumn className={styles.colStats}>
				<TextField
					hintText="asistencias"
					id="asistencias"
					type="number"
					underlineShow={false}
					value={get(this.state[`${condition}Players`][player.id], 'assists', '')}
					onChange={this.onAddScorer(player, condition, 'assists')}
					className={styles.inputGoals}
				/>
			</TableRowColumn>
		</TableRow>
	)

	renderTeam = (team, condition) => (
		<div key={`${team}-${condition}`}className={styles.score}>
			<div className={styles.shield}>
				<img src={team.logo} alt={team.name} />
			</div>
			<div className={styles.nameTeam}>
				{team.name}
			</div>
			<div className={styles.input}>
				<TextInput
					id={`${condition}Goals`}
					name={`${condition}Goals`}
					inputConfig={{
						underlineShow: false,
						className: styles.inputScore,
						hintText: '0',
						hintStyle: { right: '18px' },
					}}
					type="number"
				/>
			</div>
		</div>
	)
	onReportMatch = () => {
		const {
			formValues: { guestGoals, hostGoals },
			match: { guest, host, match: { id } },
			myTeamId
		} = this.props;
		this.props.onSubmit({
			myTeamId,
			matchId: id,
			matchInfo: {
				guestId: guest.id,
				hostId: host.id,
				guestGoals,
				hostGoals,
				hostPlayers: values(this.state.hostPlayers),
				guestPlayers: values(this.state.guestPlayers),
			},
		});
	}

	renderScorers = () => {
		const { slideIndex } = this.state;
		const {
			match,
			hostPlayers,
			guestPlayers,
			fetching,
			valid,
		} = this.props;
		if (!fetching && hostPlayers && guestPlayers)
			return (
				[
					<Tabs
						key="tabs"
						contentContainerStyle={style.container}
						onChange={this.onChange}
						value={this.state.slideIndex}
						inkBarStyle={style.inkBar}
						tabItemContainerStyle={style.tab}
					>
						<Tab
							label={match.host.name}
							className={`${styles.TeamTab} ${this.getStyle(slideIndex === 0)}`}
							value={0}
						>
							<Scrollbars style={{ height: '326px' }}>
								<Table selectable={false}>
									<TableBody displayRowCheckbox={false}>
										{hostPlayers.map((player, index) => this.renderPlayersRow(player, 'host', index))}
									</TableBody>
								</Table>
							</Scrollbars>
						</Tab>
						<Tab
							label={match.guest.name}
							className={`${styles.TeamTab} ${this.getStyle(slideIndex === 1)}`}
							value={1}
						>
							<Scrollbars style={{ height: '326px' }}>
								<Table selectable={false}>
									<TableBody displayRowCheckbox={false}>
										{guestPlayers.map((player, index) => this.renderPlayersRow(player, 'guest', index))}
									</TableBody>
								</Table>
							</Scrollbars>
						</Tab>
					</Tabs>,
					<SubmitButton
						key="report-btn"
						className={styles.btnReport}
						valid={valid}
						text="Reportar Partido"
						onClick={this.handleOpen}
						type='button'
						fullWidth
					/>,
				]
			);
		return null;
	}

	renderCondition = () => {
		const { match, myTeamId } = this.props;
		if (isMatchRejected(match, myTeamId))
			return (
				<div className={styles.approval}>
					<div>
						<FontAwesomeIcon icon="exclamation-triangle" />
						El contricante rechazo el resultado
					</div>
					{!isEmpty(match.match.verificationDescription) &&
						<p>{`"${match.match.verificationDescription}"`}</p>
					}
				</div>
			);
		return null;
	}
	handleOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false });
	};

	confirmModalButtons = () => (
		[
			<FlatButton
				label="Cancelar"
				onClick={this.handleClose}
			/>,
			<SubmitButton
				loading={this.props.requestingReport}
				text="Confirmar"
				onClick={this.onReportMatch}
				type='button'
				className={styles.confirmBtn}
				valid
			/>
		]
	)

	render() {
		const {
			match,
			fetching,
			getPlayersError,
			formValues
		} = this.props;
		const { hostPlayers, guestPlayers, open } = this.state
		const date = moment(match.match.date);
		if (getPlayersError)
			return <h3>Hubo un problema obteniendo los jugadores, intentalo mas tarde</h3>;
		return (
			<BasicLayout className={styles.report}>
				<span className={styles.scoreText}>Ingrese el resultado del partido</span>
				{this.renderTeam(match.host, 'host')}
				{this.renderTeam(match.guest, 'guest')}
				<span className={styles.stadium}><strong>Estadio:</strong> {match.match.stadium.name}</span>
				<span className={styles.time}>{capitalize(date.format('MMM DD'))} <strong>{date.format('HH:mm')}</strong></span>
				{this.renderCondition()}
				{this.renderScorers()}
				
				<Dialog
					title="Confirmar resultado"
					titleStyle={{ fontWeight: 'bold' }}
					actions={this.confirmModalButtons()}
					modal
					open={open}
					autoScrollBodyContent
				>
					{open && (
						<div className={styles.resultFlex}>
							<div className={styles.teamHome}>
								<img src={match.host.logo} alt={match.host.name} />
								{match.host.name}
							</div>
							<div className={styles.resultScore}>
								{formValues.hostGoals}-{formValues.guestGoals}
							</div>
							<div className={styles.teamAway}>
								<img src={match.guest.logo} alt={match.guest.name}/>
								{match.guest.name}
							</div>
						</div>
					)}
					{open && (
						<div className={styles.resultStats}>
							<div className={styles.players}>
								<div>
									{map(hostPlayers, player => this.renderPlayerScorer(player, 'host'))}
								</div>
								<div>
									{map(guestPlayers, player => this.renderPlayerScorer(player, 'guest'))}
								</div>
							</div>
						</div>
					)}
				</Dialog>
				{fetching && <LoadingBox showPaper={false} />}
			</BasicLayout>
		);
	}
}

ReportForm.propTypes = {
	guestPlayers: array,
	hostPlayers: array,
	match: object.isRequired,
	getTeamsPlayers: func.isRequired,
	fetching: bool.isRequired,
	myTeamId: number.isRequired,
	handleSubmit: func.isRequired,
	onSubmit: func.isRequired,
	valid: bool.isRequired,
	getPlayersError: bool.isRequired,
	requestingReport: bool.isRequired,
};

ReportForm.defaultProps = {
	guestPlayers: null,
	hostPlayers: null,
};

const mapStateToProps = (state, { match: { host: { id: hostId }, guest: { id: guestId } } }) => ({
	hostPlayers: getPlayersFromTeam(state, hostId),
	guestPlayers: getPlayersFromTeam(state, guestId),
});

export default compose(
	connect(mapStateToProps, {
		getTeamsPlayers: getTeamsPlayersAction,
	}),
)(ReportForm);
