import React from 'react';
import { withRouter } from 'react-router-dom';
import { orderBy } from 'lodash';
import { array, object, number } from 'prop-types';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import styles from './styles.scss';

const style = {
	button: {
		color: '#f93b78',
		fontWeight: 'bold',
		fontSize: '13px',
		letterSpacing: '.1em',
	},
};

const sortPlayers = players => orderBy(players, ['overall'], ['desc']).slice(0, 5);

function Players({ myTeamId, players, history }) {
	return (
		<div className={styles.players}>
			<h4>Lista de jugadores</h4>
			<Table selectable={false}>
				<TableHeader displaySelectAll={false}>
					<TableRow selectable={false}>
						<TableHeaderColumn>Nombre</TableHeaderColumn>
						<TableHeaderColumn className={styles.colNum}>Global</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false} stripedRows>
					{sortPlayers(players).map(player => (
						<TableRow key={player.id}>
							<TableRowColumn>{player.name}</TableRowColumn>
							<TableRowColumn className={styles.colNum}>{player.overall}</TableRowColumn>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<FlatButton
				className={styles.btnTable}
				label="Ver lista de jugadores detallada >"
				labelStyle={style.button}
				onClick={() => history.push(`team/${myTeamId}`)}
			/>
		</div>
	);
}

Players.propTypes = {
	players: array.isRequired,
	history: object.isRequired,
	myTeamId: number.isRequired,
};

export default withRouter(Players);
