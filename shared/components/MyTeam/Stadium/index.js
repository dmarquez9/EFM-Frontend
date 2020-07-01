import React from 'react';
import { object } from 'prop-types';
import styles from './styles.scss';
import StadiumInfo from './StadiumInfo';
import Extend from './Extend';

const Stadium = ({ stadium }) => (
	<div className={styles.stadium}>
		<h4>{stadium.name}</h4>
		<hr className={styles.hr} />
		<div className={styles.flex}>
			<StadiumInfo stadium={stadium} />
			<Extend />
		</div>
	</div>
);
Stadium.propTypes = {
	stadium: object.isRequired,
};

export default Stadium;
