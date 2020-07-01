import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { number, func, bool } from 'prop-types';
import { reduxForm, getFormValues } from 'redux-form';
import { PROCESSING, ERROR } from '../../../../constants/requestStatuses';

import ReportForm from './ReportForm';
import { reportMatch as reportMatchAction } from '../../../../actions/matches';
import { getTeamPlayersRequest, getReportMatchRequest } from '../../../../selectors';
import validate from './validate';

class ReportFormContainer extends PureComponent {
	onSubmit = ({ matchId, myTeamId, matchInfo }) => {
		this.props.reportMatch(matchId, myTeamId, matchInfo);
	}
	render() {
		return (
			<ReportForm
				key="report"
				{...this.props}
				onSubmit={this.onSubmit}
			/>
		);
	}
}

ReportFormContainer.propTypes = {
	myTeamId: number.isRequired,
	reportMatch: func.isRequired,
	getPlayersError: bool.isRequired,
};

const mapStateToProps = state => ({
	fetching: getTeamPlayersRequest(state).status === PROCESSING,
	requestingReport: getReportMatchRequest(state).status === PROCESSING,
	getPlayersError: getTeamPlayersRequest(state).status === ERROR,
	formValues: getFormValues('reportMatch')(state)
});
export default compose(
	connect(mapStateToProps, { reportMatch: reportMatchAction }),
	reduxForm({
		validate,
		initialValues: {},
		form: 'reportMatch',
	}))(ReportFormContainer);
