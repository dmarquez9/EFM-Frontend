import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { object, func } from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.scss';
import { logout as logoutAction } from '../../../actions/auth';

const style = {
	label: {
		fontSize: '12px',
		fontWeight: 'bold',
		textTransform: 'normal',
		paddingLeft: '14px',
	},
};

class User extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
	}
	handleClick = (event) => {
		event.preventDefault();
		this.setState({
			open: true,
			anchorEl: event.currentTarget,
		});
	};
	handleRequestClose = () => {
		this.setState({
			open: false,
		});
	};
	render() {
		const { user, logout } = this.props;
		return (
			<div className={styles.User}>
				<RaisedButton
					label={user.username}
					disableTouchRipple
					backgroundColor="#000"
					labelColor="#fff"
					labelStyle={style.label}
					onClick={this.handleClick}
					className={styles.btnUser}
				/>
				<Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
					targetOrigin={{ horizontal: 'right', vertical: 'top' }}
					onRequestClose={this.handleRequestClose}
				>
					<Menu>
						{/* <MenuItem
							primaryText="Configuracion"
							leftIcon={<FontAwesomeIcon icon="cogs" />}
						/> */ }
						<MenuItem
							primaryText="Cerrar sesion"
							onClick={() => logout()}
							leftIcon={<FontAwesomeIcon icon="sign-out-alt" />}
						/>
					</Menu>
				</Popover>
			</div>
		);
	}
}

User.propTypes = {
	user: object.isRequired,
	logout: func.isRequired,
};

export default compose(
	withRouter,
	connect(null, { logout: logoutAction }),
)(User);
