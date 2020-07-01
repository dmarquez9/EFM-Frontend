import React from 'react';
import { bool } from 'prop-types';
import Link from 'react-router-dom/Link';
import styles from './styles.scss';

const Menu = ({ isAuthenticated }) => (
	<ul className={styles.Menu}>
		<li><Link to="/">Inicio</Link></li>
		<li><Link to="/leagues/1/division/1">Primera Division</Link></li>
		<li><Link to="/leagues/1/division/2">Segunda Division</Link></li>
		{isAuthenticated && <li><Link to="/myteam">Mi equipo </Link></li>}
		{!isAuthenticated && <li><Link to="/login">Login</Link></li>}
	</ul>
);

Menu.propTypes = {
	isAuthenticated: bool.isRequired,
};

export default Menu;
