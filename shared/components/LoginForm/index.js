import React, { Component } from 'react';

// Material UI Components
import FlatButton from 'material-ui/FlatButton';

// Components
import styles from './styles.scss';
import Signin from './Signin';
import Signup from './Signup';

class LoginForm extends Component {
	state = {
		isLogin: true,
	};
	changeView = () =>
		this.setState(prevState => ({
			isLogin: !prevState.isLogin,
		}));
	renderLogin = () => (
		<div className={styles.loginForm}>
			<Signin />
			<div className={styles.signButton}>
				ó
				<FlatButton label="Regístrate" primary onClick={this.changeView} />
			</div>
		</div>
	);
	renderSignup = () => (
		<div className={styles.loginForm}>
			<Signup />
			<div className={styles.signButton}>
				o
				<FlatButton label="Inicia Sesión" primary onClick={this.changeView} />
			</div>
		</div>
	);

	render() {
		const { isLogin } = this.state;
		if (isLogin) return this.renderLogin();
		return this.renderSignup();
	}
}

export default LoginForm;
