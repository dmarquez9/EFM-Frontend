import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { object, func, bool } from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import Link from 'react-router-dom/Link';
import { logout as logoutAction } from '../../../actions/auth';

class MenuMobile extends PureComponent {
	render() {
		const { user, logout, isAuthenticated, close } = this.props;
		return (
			<div>
				<MenuItem onClick={close} containerElement={<Link to="/" />}>Inicio</MenuItem>
				<MenuItem onClick={close} containerElement={<Link to="/leagues/1/division/1" />}>Primera Division</MenuItem>
				<MenuItem onClick={close} containerElement={<Link to="/leagues/1/division/2" />}>Segunda Division</MenuItem>
				{isAuthenticated && <MenuItem onClick={close} containerElement={<Link to="/myteam" />}>Mi equipo</MenuItem>}
				{!isAuthenticated && <MenuItem onClick={close} containerElement={<Link to="/login" />}>Login</MenuItem>}
				{isAuthenticated &&
					<MenuItem onClick={() => { logout(); close(); }}>Cerrar sesion</MenuItem>
				}
			</div>
		);
	}
}

MenuMobile.propTypes = {
	isAuthenticated: bool.isRequired,
	user: object.isRequired,
	logout: func.isRequired,
	close: func.isRequired,
};

export default compose(
	withRouter,
	connect(null, { logout: logoutAction }),
)(MenuMobile);
