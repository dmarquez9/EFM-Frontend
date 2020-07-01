import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { object, bool, func } from 'prop-types';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { FlatButton, Dialog, TextField } from 'material-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.scss';
import abbreviateNumber from '../../utils/logic/abbreviateNumber';
import getStadiumLevel from '../../utils/logic/stadiumLevel';
import Game from '../Game';
import { updateInMarket as updateInMarketAction } from '../../actions/market';
import { getRequestStatus } from '../../selectors';
import { PROCESSING } from '../../constants/requestStatuses';
import bindInput from '../../utils/logic/bindInput';

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

const style = {
	gold: {
		background: 'linear-gradient(135deg,#ffe38a 0,#bc9600 100%)',
		border: '1px solid #ffe38a',
	},
	silver: {
		background: 'linear-gradient(135deg,#d6dbde 0,#aeaeae 100%)',
		border: '1px solid #d6dbde',
	},
	bronze: {
		background: 'linear-gradient(135deg,#d2a97e 0,#8d553e 100%)',
		border: '1px solid #d2a97e',
	},
};
class Team extends Component {
	constructor(props) {
		super(props);
		this.state = {
			remove: false,
			add: false,
			selected: null,
			error: null,
		};
		this.updatePlayerStatus = this.updatePlayerStatus.bind(this);
	}

	openRemove = player => () => this.setState({ remove: true, selected: player, error: null });
	closeRemove = () => this.setState({ remove: false, selected: null });
	openAdd = player => () => this.setState({ add: true, selected: player, error: null });
	closeAdd = () => this.setState({ add: false, selected: null });

	getStyle = (global) => {
		if (global > 74) {
			return style.gold;
		} else if (global > 64) {
			return style.silver;
		}
		return style.bronze;
	};
	renderMarket = (player) => {
		if (this.props.myUser.id !== this.props.team.user.id)
			return null;
		if (player.market)
			return (
				<TableRowColumn className={styles.colInput}>
					<FlatButton
						className={styles.btnFalse}
						label="Retirar del mercado"
						onClick={this.openRemove(player)}
						icon={<FontAwesomeIcon className={styles.btnIcon} icon="cart-arrow-down" />}
					/>
				</TableRowColumn>
			);
		return (
			<TableRowColumn className={styles.colInput}>
				<FlatButton
					className={styles.btnTrue}
					label="Añadir al mercado"
					onClick={this.openAdd(player)}
					icon={<FontAwesomeIcon className={styles.btnIcon} icon="cart-plus" />}
				/>
			</TableRowColumn>
		);
	};
	async updatePlayerStatus(condition) {
		const { error } = await this.props.updateInMarket({
			playerId: this.state.selected.id,
			description: this.state.description,
			condition,
		});
		console.log(error)
		if (!error) {
			if (condition)
				this.closeAdd();
			else
				this.closeRemove();
		}
		else this.setState({ error: 'Servicio no disponible, intentalo mas tarde.' });
	}
	// renderActionsAdd = () => [
	// 	<FlatButton
	// 		label="Cancelar"
	// 		disabled={this.props.loading}
	// 		onClick={this.closeAdd}
	// 	/>,
	// 	<FlatButton
	// 		label="Añadir"
	// 		primary
	// 		disabled={this.props.loading}
	// 		onClick={() => this.updatePlayerStatus(true)}
	// 	/>,
	// ];
	// renderRemoveActions = () => [
	// 	<FlatButton
	// 		label="Cancelar"
	// 		onClick={this.closeRemove}
	// 		disabled={this.props.loading}
	// 	/>,
	// 	<FlatButton
	// 		label="Aceptar"
	// 		primary
	// 		onClick={() => this.updatePlayerStatus(false)}
	// 		disabled={this.props.loading}
	// 	/>,
	// ];
	render() {
		const { team } = this.props;
		return (
			<div className={styles.squad}>
				<Helmet>
					<title>EFM | {team.name}</title>
				</Helmet>
				<div className={styles.sidebar}>
					<div className={styles.boxInfo}>
						<div className={styles.flexCenter}>
							<div className={styles.shield}>
								<img src={team.logo} alt="*" />
							</div>
							<div className={styles.item}>
								<h5>{team.name}</h5>
								<span>{team.division.name}</span>
							</div>
						</div>
						<div className={styles.info}>
							<div className={styles.text}>Entrenador</div>
							<div className={styles.item}>{team.user.username}</div>
						</div>
						<h4 className={styles.title}>Estadio</h4>
						<img className={styles.stadium} src={stadiumLevel(team.stadium)} alt="*" />
						<small>{team.stadium.name}</small>
						<div className={styles.info}>
							<div className={styles.text}>Nivel de estadio</div>
							<div className={styles.item}>Nivel D</div>
						</div>
					</div>
					{this.props.team.matches.length > 0 && ([
						<div className={styles.boxGames}>
							<h4 key="games" className={styles.title}>Partidos</h4>
							<div key="games-list" className={styles.Games}>
								{this.props.team.matches.map(match => (
									<div key={match.match.id}>
										<Game
											home={match.host}
											away={match.guest}
											date={match.match.date}
										/>
									</div>
								))}
							</div>
						</div>,
					])}
					{/* <h4 className={styles.title}>Patrocinadores</h4>
					<div className={styles.sponsor}>
						<div><img src="pepsi.png" alt="*" /></div>
						<div><img src="mastercard.png" alt="*" /></div>
					</div> */}
				</div>
				<div className={styles.item}>
					<Table selectable={false}>
						<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
							<TableRow selectable={false}>
								<TableHeaderColumn className={styles.colGlobal} />
								<TableHeaderColumn className={styles.colImage} />
								<TableHeaderColumn className={styles.colPlayer}>Jugadores</TableHeaderColumn>
								<TableHeaderColumn className={styles.colNum}>TG</TableHeaderColumn>
								<TableHeaderColumn className={styles.colNum}>TA</TableHeaderColumn>
								<TableHeaderColumn className={styles.colNum}>GT</TableHeaderColumn>
								<TableHeaderColumn className={styles.colNum}>AT</TableHeaderColumn>
								<TableHeaderColumn className={styles.colNum}>V</TableHeaderColumn>
								{/* <TableHeaderColumn className={styles.colInput} /> */}
							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={false} showRowHover>
							{team.players.map(player => (
								<TableRow key={player.id}>
									<TableRowColumn className={styles.colGlobal}>
										<span style={this.getStyle(player.overall)}>{player.overall}</span>
									</TableRowColumn>
									<TableRowColumn
										className={styles.colImage}
										style={{ backgroundImage: `url(${player.photo})` }}
									/>
									<TableRowColumn className={styles.colPlayer}>
										{player.name}
									</TableRowColumn>
									<TableRowColumn className={styles.colNum}>
										{player.globalGoals || 0}
									</TableRowColumn>
									<TableRowColumn className={styles.colNum}>
										{player.globalAssists || 0}
									</TableRowColumn>
									<TableRowColumn className={styles.colNum}>
										{player.seasonGoals || 0}
									</TableRowColumn>
									<TableRowColumn className={styles.colNum}>
										{player.seasonAssists || 0}
									</TableRowColumn>
									<TableRowColumn className={styles.colNum}>
										{abbreviateNumber(player.value, 3)}
									</TableRowColumn>
									{/* {this.renderMarket(player)} */}
								</TableRow>
							))}

						</TableBody>
					</Table>
					<div className={styles.leyenda}>
						<div>
							<span>TG:</span> Total de Goles
						</div>
						<div>
							<span>TA:</span> Total de Asistencias
						</div>
						<div>
							<span>GT:</span> Goles en la temporada
						</div>
						<div>
							<span>AT:</span> Asistencias en la temporada
						</div>
						<div>
							<span>V:</span> Valor
						</div>
					</div>
				</div>
				{/* <Dialog
					actions={this.renderRemoveActions()}
					modal={false}
					open={this.state.remove}
					onRequestClose={this.closeRemove}
				>
					¿Quieres retirar a <span className={styles.strong}>{this.state.selected ? this.state.selected.name : ''}</span> del mercado?
					{this.state.error && <strong className={styles.error}>{this.state.error}</strong>}
				</Dialog>
				<Dialog
					title={this.state.selected ? this.state.selected.name : ''}
					titleStyle={{ fontWeight: 'bold' }}
					actions={this.renderActionsAdd()}
					modal={false}
					open={this.state.add}
					onRequestClose={this.closeAdd}
				>
					Escribe una descripcion sobre lo que quieres a cambio de este jugador.
					<TextField
						fullWidth
						hintText="Descripcion"
						multiLine
						value={this.state.description}
						onChange={bindInput(this, 'description')}
					/>
					{this.state.error && <strong className={styles.error}>{this.state.error}</strong>}
				</Dialog> */}
			</div>
		);
	}
}

Team.propTypes = {
	team: object.isRequired,
	loading: bool.isRequired,
	updateInMarket: func.isRequired,
	myUser: object.isRequired,
};

const mapStateToProps = state => ({
	loading: getRequestStatus('postInMarket')(state).status === PROCESSING,
});
export default connect(
	mapStateToProps,
	{ updateInMarket: updateInMarketAction },
)(Team);
