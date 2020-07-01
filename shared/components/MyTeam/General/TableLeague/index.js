import React from 'react';
import { array, number, string, object } from 'prop-types';
import { orderBy } from 'lodash';
import { withRouter } from 'react-router-dom';
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
const sortPositions = (positions /* , myTeamId */) => {
	const orderer = orderBy(positions, ['score'], ['desc']).map((position, index) => ({ ...position, pos: index + 1 }));
	/* const myPosition = orderer.find(t => t.team.id === myTeamId);
	const after = orderer
		.filter(p => p.position > myPosition.position)
		.slice(0, myPosition.position > orderer.length - 2 ? myPosition.position - orderer.length : 2);
	const before = orderBy(orderer.filter(p =>
		p.position < myPosition.position), ['position'], 'desc')
		.slice(0, myPosition.position < 3 ? myPosition.position - 1 : 2);
	const finals = orderBy([...after, ...before, myPosition], ['position'], ['asc']);
	console.log({finals, a: orderBy(positions, ['score'], ['desc'])}) */
	return orderer.slice(0, 5);
};

const TableLeague = ({ positions, myTeamId, history, divisionRoute }) => (
	<div className={styles.tableleague}>
		<h4>Tabla General</h4>
		<Table selectable={false}>
			<TableHeader displaySelectAll={false}>
				<TableRow selectable={false}>
					<TableHeaderColumn className={styles.colNum}>Pos</TableHeaderColumn>
					<TableHeaderColumn>Equipo</TableHeaderColumn>
					<TableHeaderColumn className={styles.colNum}>Pts</TableHeaderColumn>
				</TableRow>
			</TableHeader>
			<TableBody displayRowCheckbox={false}>
				{sortPositions(positions, myTeamId).map(position => (
					<TableRow key={position.team.id} className={position.team.id === myTeamId ? styles.active : ''}>
						<TableRowColumn className={styles.colNum}>{position.pos}</TableRowColumn>
						<TableRowColumn>
							<span onClick={() => history.push(`team/${position.team.id}`)}>
								{position.team.name}
							</span>
						</TableRowColumn>
						<TableRowColumn className={styles.colNum}>{position.position.score}</TableRowColumn>
					</TableRow>
				))}
			</TableBody>
		</Table>
		<FlatButton
			className={styles.btnTable}
			label="Ver la tabla completa >"
			labelStyle={style.button}
			onClick={() => history.push(divisionRoute)}
		/>
	</div>
);

TableLeague.propTypes = {
	positions: array.isRequired,
	divisionRoute: string.isRequired,
	myTeamId: number.isRequired,
	history: object.isRequired,
};

export default withRouter(TableLeague);
