import React from 'react';
import { object } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.scss';
import abbreviateNumber from '../../../../utils/logic/abbreviateNumber';
import getStadiumLevel from '../../../../utils/logic/stadiumLevel';


const stadiumLevel = (stadium) => {
	switch (getStadiumLevel(stadium)) {
	case 'A':
		return 'https://i.imgur.com/CMRlRNZ.png';
	case 'B':
		return 'https://i.imgur.com/XMIDJlg.png';
	case 'C':
		return 'https://i.imgur.com/gk1Je7Z.png';
	default:
		return 'https://i.imgur.com/jhDxSnn.png';
	}
};
const StadiumInfo = ({ stadium }) => (
	<div className={styles.stadiuminfo}>
		<div
			className={styles.stImage}
			style={{ backgroundImage: `url(${stadiumLevel(stadium)})` }}
		/>
		<div className={styles.info}>
			<div>
				<FontAwesomeIcon icon="users" />
				Capacidad
				<span>{abbreviateNumber(stadium.vip + stadium.tribunes + stadium.terraces, 1)}</span>
			</div>
			<div>
				<FontAwesomeIcon icon="store" />
				Tiendas <span>{stadium.shops}</span>
			</div>
			<div>
				<FontAwesomeIcon icon="user-tie" />
				Tribunas del Club <span>{abbreviateNumber(stadium.tribunes, 1)}</span>
			</div>
			<div>
				<FontAwesomeIcon icon="industry" />
				Gradas
				<span>{abbreviateNumber(stadium.terraces, 1)}</span>
			</div>
			<div>
				<FontAwesomeIcon icon="utensils" />
				Comida Rapida
				<span>{stadium.fastfoods}</span>
			</div>
			<div>
				<FontAwesomeIcon icon="star" />
				VIP
				<span>{abbreviateNumber(stadium.vip, 1)}</span>
			</div>
		</div>
	</div>
);

StadiumInfo.propTypes = {
	stadium: object.isRequired,
};

export default StadiumInfo;
