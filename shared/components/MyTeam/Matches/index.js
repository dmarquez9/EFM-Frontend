import React, { PureComponent } from 'react';
import moment from 'moment';
import Snackbar from 'material-ui/Snackbar';
import { array, number, string } from 'prop-types';
import { capitalize } from 'lodash';
import { connect } from 'react-redux';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.scss';
import Match from './Match';
import Report from './Report';
import getMyMatchStatus from '../../../utils/logic/getMyMatchStatus';
import { getReportMatchRequest, getVerifyMatchRequest } from '../../../selectors';
import { SUCCESS, ERROR, PROCESSING } from '../../../constants/requestStatuses';
import isMatchRejected from '../../../utils/logic/isMatchRejected';

const TYPES = {
	MATCHES: 'matches',
	REPORTED: 'reported',
};
const SNACK_REPORT_MESSAGES = {
	success: 'El partido ha sido reportado correctamente',
	error: 'Hubo un error reportando el partido, intentalo mas tarde',
};
const SNACK_VERIFY_MESSAGES = {
	success: 'El partido ha sido verificado correctamente',
	error: 'Hubo un error verificando el partido, intentalo mas tarde',
};
class Matches extends PureComponent {
	state = { selected: null, snackbar: false, snackbarMessage: '' }
	closeModal = () => this.setState({ selected: null });
	getSelectedMatch = () => {
		const [type, index] = this.state.selected ? this.state.selected.split('-') : [null, null];
		if (type && index >= 0) {
			const match = this.props[type][index]
			if (match)
				return { ...match, type };
			return null;
		}
		return null;
	}
	renderRow = (match, type, index) => {
		const date = moment(new Date(match.match.date));
		const pending = match.host.verification === null && match.guest.verification === null;
		return (
			<TableRow
				key={match.match.id}
				className={this.state.selected === `${type}-${index}` ? styles.activeRow : styles.defaultRow}
				selected={this.state.selected === `${type}-${index}`}
			>
				<TableRowColumn className={styles.colDate}>
					<span className={styles.time}>{date.format('HH:mm')}</span>
					{capitalize(date.format('MMM DD'))}
				</TableRowColumn>
				<TableRowColumn
					className={styles.colShield}
					style={{ backgroundImage: `url(${match.host.logo})` }}
				/>
				<TableRowColumn className={styles.teamHome}>{match.host.name}</TableRowColumn>
				<TableRowColumn className={styles.colScore}>
					<div className={styles[getMyMatchStatus(this.props.myTeamId, match)]}>
						{pending && <span> - </span>}
						{!pending && <span>{`${match.host.goals} - ${match.guest.goals}`}</span>}
					</div>
				</TableRowColumn>
				<TableRowColumn className={styles.teamAway}>{match.guest.name}</TableRowColumn>
				<TableRowColumn
					className={styles.colShield}
					style={{ backgroundImage: `url(${match.guest.logo})` }}
				/>
			</TableRow>
		);
	}

	onSelectMatch = selected => this.setState({ selected: `matches-${selected}` })
	onSelectReported = selected => this.setState({ selected: `reported-${selected}` })
	renderMatchDetail = () => {
		const selectedMatch = this.getSelectedMatch();
		if (selectedMatch) {
			if (selectedMatch.type === TYPES.REPORTED || selectedMatch.match.played)
				return (
					<Match
						myTeamId={this.props.myTeamId}
						match={selectedMatch}
						fetchingVerification={this.props.verifyStatus === PROCESSING}
					/>
				);
			return (
				<Report
					myTeamId={this.props.myTeamId}
					match={selectedMatch}
				/>
			);
		}

		return null;
	}
	componentDidUpdate = ({ reportStatus, verifyStatus }) => {
		const reportSuccess = reportStatus !== SUCCESS && this.props.reportStatus === SUCCESS;
		const reportError = reportStatus !== ERROR && this.props.reportStatus === ERROR;
		const verifySuccess = verifyStatus !== SUCCESS && this.props.verifyStatus === SUCCESS;
		const verifyError = verifyStatus !== ERROR && this.props.verifyStatus === ERROR;
		if (reportError || reportSuccess)
			this.setState({
				selected: null,
				snackbar: true,
				snackbarMessage: reportSuccess ?
					SNACK_REPORT_MESSAGES.success :
					SNACK_REPORT_MESSAGES.error,
			});
		if (verifyError || verifySuccess)
			this.setState({
				selected: null,
				snackbar: true,
				snackbarMessage: verifySuccess ?
					SNACK_VERIFY_MESSAGES.success :
					SNACK_VERIFY_MESSAGES.error,
			});
	}
	render() {
		return (
			<div className={styles.matches}>
				<div className={styles.item}>
					<h4>Partidos</h4>
					<Table onRowSelection={this.onSelectMatch}>
						<TableBody displayRowCheckbox={false} deselectOnClickaway={false} showRowHover>
							{this.props.matches.map((match, index) => this.renderRow(match, 'matches', index))}
						</TableBody>
					</Table>
					<h4>Partidos reportados</h4>
					<Table onRowSelection={this.onSelectReported}>
						<TableBody displayRowCheckbox={false} deselectOnClickaway={false} showRowHover>
							{this.props.reported.map((match, index) => this.renderRow(match, 'reported', index))}
						</TableBody>
					</Table>
				</div>
				<div className={styles.match} hidden={!this.state.selected}>
					<button className={styles.btnModal} onClick={this.closeModal}>
						<FontAwesomeIcon
							icon={['fas', 'times-circle']}
						/>
					</button>
					{this.renderMatchDetail()}
				</div>
				<Snackbar
					open={this.state.snackbar}
					message={this.state.snackbarMessage}
					autoHideDuration={4000}
					onRequestClose={() => this.setState({ snackbar: false })}
				/>
			</div>
		);
	}
}
Matches.propTypes = {
	reported: array.isRequired,
	matches: array.isRequired,
	myTeamId: number.isRequired,
	reportStatus: string.isRequired,
	verifyStatus: string.isRequired,
};

const mapStateToProps = (state) => {
	const allMatches = state.user.matches;
	const matches = [];
	const reported = [];
	allMatches.forEach((m) => {
		const hostVerified = m.host.verification && m.guest.verification === null;
		const guestVerified = m.guest.verification && m.host.verification === null;
		if (hostVerified || guestVerified)
			reported.push(m);
		else
			matches.push(m);
		return hostVerified || guestVerified;
	});
	return {
		matches,
		reported,
		reportStatus: getReportMatchRequest(state).status,
		verifyStatus: getVerifyMatchRequest(state).status,
	};
};
export default connect(mapStateToProps)(Matches);
