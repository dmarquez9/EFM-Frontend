import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { isEmpty } from 'lodash';
import { func, bool, string } from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { reduxForm, formValueSelector } from 'redux-form';
import ExtendForm from './ExtendForm';

import validate from './validate';
import { getMyTeamRequest } from '../../../../selectors';
import { updateMyStadium as updateMyStadiumAction } from '../../../../actions/teams';

class ExtendFormContainer extends PureComponent {
	state = { snackbar: false, snackbarMessage: '' }
	componentDidUpdate = ({ fetching: prevFetching }) => {
		if (prevFetching && !this.props.fetching && isEmpty(this.props.requestError))
			this.setState({
				snackbar: true,
				snackbarMessage: 'El estadio ha sido actualizado con exito',
			});
	}
	onSubmit = (values) => {
		this.props.updateMyStadium(values);
	}
	render() {
		return (
			<ExtendForm {...this.props} onSubmit={this.onSubmit}>
				<Snackbar
					open={this.state.snackbar}
					message={this.state.snackbarMessage}
					autoHideDuration={4000}
					onRequestClose={() => this.setState({ snackbar: false })}
				/>
			</ExtendForm>
		);
	}
}

const formName = 'stadium';
const selector = formValueSelector(formName);
const buildPrices = {
	vip: 600,
	terraces: 140,
	tribunes: 300,
	fastfoods: 900000,
	shops: 1400000,
};
const mapStateToProps = (state) => {
	const { vip, terraces, tribunes, fastfoods, shops } = selector(state, 'vip', 'terraces', 'tribunes', 'fastfoods', 'shops');
	const subTotal = ((vip || 0) * buildPrices.vip) + ((terraces || 0) * buildPrices.terraces)
				+ ((tribunes || 0) * buildPrices.tribunes) + ((shops || 0) * buildPrices.shops)
				+ ((fastfoods || 0) * buildPrices.fastfoods);
	const workForce = subTotal * 0.2;
	const { fetching, error } = getMyTeamRequest(state);
	return {
		subTotal: subTotal || 0,
		workForce: workForce || 0,
		total: (workForce + subTotal) || 0,
		requestError: error,
		fetching,
	};
};

ExtendFormContainer.propTypes = {
	updateMyStadium: func.isRequired,
	fetching: bool.isRequired,
	requestError: string,
};
ExtendFormContainer.defaultProps = {
	requestError: '',
};

export default compose(
	reduxForm({
		form: formName,
		validate,
	}),
	connect(mapStateToProps, { updateMyStadium: updateMyStadiumAction }),
)(ExtendFormContainer);
