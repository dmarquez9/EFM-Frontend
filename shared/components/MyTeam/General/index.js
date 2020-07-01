import React from 'react';
import { object } from 'prop-types';
import GeneralButton from './GeneralButton';
import Games from './Games';
import TableLeague from './TableLeague';
import Players from './Players';

import styles from './styles.scss';

import abbreviateNumber from '../../../utils/logic/abbreviateNumber';
import stadiumLevel from '../../../utils/logic/stadiumLevel';

const General = ({ team }) => (
	<div>
		<div className={styles.flex}>
			<GeneralButton label="presupuesto" value={abbreviateNumber(Number(team.balance), 2)} bgColor="#3598dc" icon="hand-holding-usd" />
			<GeneralButton label="sueldos/temp." value={abbreviateNumber(Number(team.wages), 2)} bgColor="#e7505a" icon="dollar-sign" />
			<GeneralButton label="felicidad" value={`${team.fansHappiness} %`} bgColor="#32c5d2" icon="users" />
			<GeneralButton label="estadio" value={`Nivel ${stadiumLevel(team.stadium)}`} bgColor="#8e44ad" icon="building" />
		</div>
		<div className={styles.flex}>
			<Games competition={team.division.name} className={styles.box} />
			<TableLeague
				myTeamId={team.id}
				positions={team.season.positions}
				className={styles.box}
				divisionRoute={`/leagues/${team.league.id}/division/${team.division.id}`}
			/>
			<Players myTeamId={team.id} players={team.players} className={styles.box} />
		</div>
	</div>
);

General.propTypes = {
	team: object.isRequired,
};

export default General;
