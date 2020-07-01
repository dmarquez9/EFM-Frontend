import React from 'react';
import { object } from 'prop-types';
import styles from './styles.scss';

const TeamInfo = ({ team, user }) => (
	<div className={styles.TeamInfo}>
		<div className={styles.container}>
			<div>
				<img
					className={styles.TeamShield}
					src={team.logo}
					alt="Deportivo Tachira Escudo"
				/>
			</div>
			<div className={styles.auto}>
				<h2 className={styles.TeamTitle}>{team.name}</h2>
				<span className={styles.TeamWelcome}>{`Bienvenido, ${user.username}! - ${team.division.name}`}</span>
			</div>
			{/* <div className={styles.TeamSponsors}>
				<img src="pepsi.png" alt="Pepsi Logo" />
				<img src="mastercard.png" alt="MasterCard Logo" />
			</div> */}
		</div>
	</div>
);

TeamInfo.propTypes = {
	team: object.isRequired,
	user: object.isRequired,
};
export default TeamInfo;
