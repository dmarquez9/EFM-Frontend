import React, { Component } from 'react';
import { bool, object } from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { RaisedButton, Drawer } from 'material-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from './Logo';
import Menu from './Menu';
import User from './User';
import MenuMobile from './MenuMobile';
import { authByToken } from '../../actions/auth';

import styles from './styles.scss';

class AppBar extends Component {
	state = {
		open: false,
	}
	componentDidMount = () => {
		this.props.authByToken();
	}
	handleToggle = () => this.setState({ open: !this.state.open });
	closeDrawer = () => this.setState({ open: false });
	render() {
		const { isAuthenticated, user } = this.props;
		return (
			<div className={styles.AppBar}>
				<div className={styles.container}>
					<div className={styles.btnMobile}>
						<RaisedButton
							onClick={this.handleToggle}
							icon={<FontAwesomeIcon icon="bars" />}
						/>
					</div>
					<div className={styles.logoContainer}><Logo /></div>
					<div className={styles.auto}>
						<Menu isAuthenticated={isAuthenticated} />
					</div>
					{isAuthenticated && <div className={styles.user}> <User user={user} /></div>}
				</div>
				<Drawer
					open={this.state.open}
					docked={false}
					onRequestChange={this.closeDrawer}
					handleClose={this.closeDrawer}
					zDepth={5}
				>
					<MenuMobile isAuthenticated={isAuthenticated} user={user} close={this.closeDrawer} />
				</Drawer>
			</div>
		);
	}
}

AppBar.propTypes = {
	isAuthenticated: bool.isRequired,
	user: object,
};

AppBar.defaultProps = {
	isAuthenticated: false,
	user: {},
};

const mapStateToProps = state => ({
	isAuthenticated: !isEmpty(state.user.data),
	user: state.user.data,
});
export default connect(mapStateToProps, { authByToken })(AppBar);
