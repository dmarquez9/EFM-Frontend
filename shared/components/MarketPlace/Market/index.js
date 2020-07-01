import React, { Component } from 'react';
import { bool, func, array } from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, flatten } from 'lodash';
// import {
// 	Table,
// 	TableBody,
// 	TableHeader,
// 	TableHeaderColumn,
// 	TableRow,
// 	TableRowColumn,
// } from 'material-ui/Table';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.scss';
import {
	fetchMarketAvailables as fetchMarketAvailablesAction,
} from '../../../actions/market';
import { PROCESSING, ERROR } from '../../../constants/requestStatuses';
import { getMarketRequest } from '../../../selectors';
import LoadingBox from '../../LoadingBox';
import bindInput from '../../../utils/logic/bindInput';
import partition from '../../../utils/arrays/splitArray';
import MakeOffer from './MakeOffer';

class Market extends Component {
	state = {
		open: false,
		page: 0,
		loaded: false,
		selected: null,
		searcher: '',
		snackbarOpen: false,
	};

	componentDidUpdate = ({ loading: prevLoading }) => {
		if (prevLoading && !this.props.loading)
			this.setState({ loaded: true });
	}
	componentDidMount = () => {
		if (isEmpty(this.props.availables))
			this.props.fetchMarketAvailables();
	}
	handleOpen = player => () => {
		this.setState({ open: true, selected: player });
	};

	handleClose = (success) => {
		this.setState({ open: false, selected: null, snackbarOpen: success });
	};

	closeSnackbar = () => this.setState({ snackbarOpen: false })

	getAvailablesFiltered = () => {
		const input = this.state.searcher.trim();
		if (isEmpty(input) || input.length <= 3)
			return { data: this.props.availables[this.state.page], filtered: false };

		const data = flatten(this.props.availables).filter((e) => {
			const regex = new RegExp(this.state.searcher.trim(), 'ig');
			return regex.test(e.player.name) || regex.test(e.team.name);
		});
		return { data, filtered: true };
	}
	renderAvailablesOnMarket = () => {
		if (this.props.loading)
			return <LoadingBox />;
		else if (this.state.loaded && this.props.availables.length === 0)
			return (
				<div className={styles.noPlayers}>
					<FontAwesomeIcon icon="star-half" />
					<span>No hay jugadores disponibles en el mercado</span>
				</div>
			);
		else if (this.props.availables.length > 0)
			return (
				<div className={styles.marketPlayers}>
					{this.getAvailablesFiltered().data.map((available, index) => (
						<div
							className={styles.player}
							onClick={this.handleOpen(available)}
							key={`${available.id}-${index}-available`}
						>
							<div className={styles.overlay} />
							<div className={styles.image} style={{ backgroundImage: `url(${available.player.photo})` }}>
								<div
									className={styles.club}
									title={available.team.name}
									style={{ backgroundImage: `url(${available.team.logo})` }}
								/>
							</div>
							<div className={styles.item}>
								<h4>{available.player.name}</h4>
								<small>{available.team.name}</small>
								<div className={styles.stats}>
									<div className={styles.goals}>
										<FontAwesomeIcon icon="futbol" />
										{available.player.globalGoals}G
									</div>
									<div className={styles.assist}>
										<FontAwesomeIcon icon="hands-helping" />
										{available.player.globalAssists}A
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			);
		return null;
	}
	changePage = page => () => {
		if (page !== this.state.page)
			this.setState({ page });
	}
	renderPagination = () => {
		if (this.props.availables.length > 0) {
			const availables = this.getAvailablesFiltered();
			return (
				<div className={styles.pagination}>
					<div className={styles.search}>
						<FontAwesomeIcon icon="search" />
						<TextField
							hintText="Buscar"
							value={this.state.searcher}
							onChange={bindInput(this, 'searcher')}
							onKeyPress={this.listenOnKeyPress}
							underlineShow={false}
						/>
					</div>
					{(!availables.filtered && this.props.availables.length > 1) && (
						<div className={styles.pages}>
							{this.state.page > 0 && (
								<a onClick={this.changePage(this.state.page - 1)}>
									<FontAwesomeIcon icon="angle-left" />
								</a>
							)}
							{this.props.availables.map((_, index) => (
								<a
									className={this.state.page === index ? styles.active : null}
									key={index}
									onClick={this.changePage(index)}
								>
									{index + 1}
								</a>
							))}
							{this.state.page < this.props.availables.length - 1 && (
								<a onClick={this.changePage(this.state.page + 1)}>
									<FontAwesomeIcon icon="angle-right" />
								</a>
							)}
						</div>
					)}
				</div>
			);
		}
		return null;
	}
	render() {
		return (
			<div className={styles.market}>
				<div className={styles.flex}>
					<div className={styles.item}>
						<h4 className={styles.title}>Jugadores en el mercado</h4>
						{this.renderPagination()}
						{this.renderAvailablesOnMarket()}
					</div>
					{/* <div className={styles.sidebar}>
						<h6 className={styles.title}>Ultimas transferencias</h6>
						<div className={styles.boxShadow}>
							<Table className={styles.latest} selectable={false}>
								<TableHeader adjustForCheckbox={false} displaySelectAll={false}>
									<TableRow>
										<TableHeaderColumn className={styles.colImage} />
										<TableHeaderColumn className={styles.colName}>Jugador</TableHeaderColumn>
										<TableHeaderColumn className={styles.colTransfer} />
										<TableHeaderColumn className={styles.colFee}>
									Fee
										</TableHeaderColumn>
									</TableRow>
								</TableHeader>
								<TableBody displayRowCheckbox={false} showRowHover>
									<TableRow>
										<TableRowColumn
											className={styles.colImage}
											style={{ backgroundImage: 'url(jugadores/messi.png)' }}
										/>
										<TableRowColumn className={styles.colName}>L. Messi</TableRowColumn>
										<TableRowColumn
											className={styles.colTransfer}
										>
											<div
												className={styles.after}
												style={{ backgroundImage: 'url(escudos/deportivo-tachira.png)' }}
											/>
											<img src="escudos/caracas-fc.png" alt="*" />
										</TableRowColumn>
										<TableRowColumn className={styles.colFee}>
											<span>240</span>Mill. $
										</TableRowColumn>
									</TableRow>
									<TableRow>
										<TableRowColumn
											className={styles.colImage}
											style={{ backgroundImage: 'url(jugadores/cristiano.png)' }}
										/>
										<TableRowColumn className={styles.colName}>Cristiano Ronaldo</TableRowColumn>
										<TableRowColumn
											className={styles.colTransfer}
										>
											<div
												className={styles.after}
												style={{ backgroundImage: 'url(escudos/deportivo-tachira.png)' }}
											/>
											<img src="escudos/caracas-fc.png" alt="*" />
										</TableRowColumn>
										<TableRowColumn className={styles.colFee}>
											<span>240</span>Mill. $
										</TableRowColumn>
									</TableRow>
									<TableRow>
										<TableRowColumn
											className={styles.colImage}
											style={{ backgroundImage: 'url(jugadores/messi.png)' }}
										/>
										<TableRowColumn className={styles.colName}>L. Messi</TableRowColumn>
										<TableRowColumn
											className={styles.colTransfer}
										>
											<div
												className={styles.after}
												style={{ backgroundImage: 'url(escudos/deportivo-tachira.png)' }}
											/>
											<img src="escudos/caracas-fc.png" alt="*" />
										</TableRowColumn>
										<TableRowColumn className={styles.colFee}>
											<span>240</span>Mill. $
										</TableRowColumn>
									</TableRow>
									<TableRow>
										<TableRowColumn
											className={styles.colImage}
											style={{ backgroundImage: 'url(jugadores/messi.png)' }}
										/>
										<TableRowColumn className={styles.colName}>L. Messi</TableRowColumn>
										<TableRowColumn
											className={styles.colTransfer}
										>
											<div
												className={styles.after}
												style={{ backgroundImage: 'url(escudos/deportivo-tachira.png)' }}
											/>
											<img src="escudos/caracas-fc.png" alt="*" />
										</TableRowColumn>
										<TableRowColumn className={styles.colFee}>
											<span>240</span>Mill. $
										</TableRowColumn>
									</TableRow>
									<TableRow>
										<TableRowColumn
											className={styles.colImage}
											style={{ backgroundImage: 'url(jugadores/cristiano.png)' }}
										/>
										<TableRowColumn className={styles.colName}>Cristiano Ronaldo</TableRowColumn>
										<TableRowColumn
											className={styles.colTransfer}
										>
											<div
												className={styles.after}
												style={{ backgroundImage: 'url(escudos/deportivo-tachira.png)' }}
											/>
											<img src="escudos/caracas-fc.png" alt="*" />
										</TableRowColumn>
										<TableRowColumn className={styles.colFee}>
											<span>240</span>Mill. $
										</TableRowColumn>
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</div> */}
				</div>
				<Snackbar
					open={this.state.snackbarOpen}
					message="La oferta se realizo con exito!"
					autoHideDuration={4000}
					onRequestClose={this.closeSnackbar}
				/>
				{this.state.selected && (
					<MakeOffer
						open={this.state.open}
						handleClose={this.handleClose}
						description={this.state.selected.description}
						player={this.state.selected.player}
						marketId={this.state.selected.id}
					/>
				)}
			</div>
		);
	}
}

Market.propTypes = {
	availables: array.isRequired,
	loading: bool.isRequired,
	fetchMarketAvailables: func.isRequired,
};

const mapStateToProps = (state) => {
	const marketRequestStatus = getMarketRequest(state).status;
	const arr = state.market.availables;
	return {
		availables: partition(arr, 9),
		loading: marketRequestStatus === PROCESSING,
		error: marketRequestStatus === ERROR,
	};
};

export default connect(
	mapStateToProps,
	{ fetchMarketAvailables: fetchMarketAvailablesAction },
)(Market);
