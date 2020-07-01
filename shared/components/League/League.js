import React from 'react';
import Helmet from 'react-helmet';
import { array, object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import styles from './styles.scss';

const style = {
	champions: {
		borderLeftColor: '#09a751',
	},
	default: {
		borderLeftColor: '#e1e1e1',
	},
	europa: {
		borderLeftColor: '#ffc72b',
	},
	descenso: {
		borderLeftColor: '#ee4036',
	},
};

class League extends React.Component {
	state = { journey: 0 };

	getStyle = (position) => {
		// if (position <= 4) {
		// 	return style.champions;
		// } else if (position === 5 || position === 6) {
		// 	return style.europa;
		// } else if (position >= this.props.positions.length - 2) {
		// 	return style.descenso;
		// }
		return style.default;
	};

	handleJourneyChange = (_, __, journey) => this.setState({ journey });

	getAllMatchesCount = pos => pos.lostMatches + pos.tiedMatches + pos.wonMatches

	viewTeam = ([index]) => {
		this.props.history.push(`/team/${this.props.positions[index].team.id}`);
	}
	render() {
		const {
			positions,
			bestScorers,
			bestAssisters,
			matches,
			division,
		} = this.props;
		return (
			<div className={styles.league}>
				<Helmet>
					<title>EFM | Tabla de clasificacion</title>
				</Helmet>
				<div className={styles.flexCenter}>
					<div className={styles.leagueImg}>
						<img src={division.league.logo} alt={division.league.name} />
					</div>
					<div className={styles.item}>
						<h4>Tabla de clasificacion</h4>
						<span>{division.name}</span>
					</div>
				</div>
				<div className={styles.flex}>
					<div className={styles.item}>
						<Table selectable onRowSelection={this.viewTeam}>
							<TableHeader displaySelectAll={false}>
								<TableRow selectable={false}>
									<TableHeaderColumn className={styles.colPos} style={{ borderLeftColor: '#000' }} />
									<TableHeaderColumn className={styles.colShield} />
									<TableHeaderColumn className={styles.colTeam}>Equipos</TableHeaderColumn>
									<TableHeaderColumn className={styles.colPnt}>PT</TableHeaderColumn>
									<TableHeaderColumn className={styles.colNum}>PJ</TableHeaderColumn>
									<TableHeaderColumn className={styles.colNum}>PG</TableHeaderColumn>
									<TableHeaderColumn className={styles.colNum}>PE</TableHeaderColumn>
									<TableHeaderColumn className={styles.colNum}>PP</TableHeaderColumn>
									<TableHeaderColumn className={styles.colNum}>GF</TableHeaderColumn>
									<TableHeaderColumn className={styles.colNum}>GC</TableHeaderColumn>
									<TableHeaderColumn className={styles.colNum}>DIF</TableHeaderColumn>
								</TableRow>
							</TableHeader>
							<TableBody displayRowCheckbox={false} showRowHover>
								{positions.map(({ team, position }, index) => (
									<TableRow key={team.id}>
										<TableRowColumn
											style={this.getStyle(index + 1)}
											className={styles.colPos}
										>
											{ index + 1 }
										</TableRowColumn>
										<TableRowColumn
											style={{ backgroundImage: `url(${team.logo})` }}
											className={styles.colShield}
										/>
										<TableRowColumn className={styles.colTeam}>{team.name}</TableRowColumn>
										<TableRowColumn className={styles.colPnt}>{position.score}</TableRowColumn>
										<TableRowColumn className={styles.colNum}>
											{this.getAllMatchesCount(position)}
										</TableRowColumn>
										<TableRowColumn className={styles.colNum}>
											{position.wonMatches}
										</TableRowColumn>
										<TableRowColumn className={styles.colNum}>
											{position.tiedMatches}
										</TableRowColumn>
										<TableRowColumn className={styles.colNum}>
											{position.lostMatches}
										</TableRowColumn>
										<TableRowColumn className={styles.colNum}>
											{position.goals}
										</TableRowColumn>
										<TableRowColumn className={styles.colNum}>
											{position.goalsAgaints}
										</TableRowColumn>
										<TableRowColumn className={styles.colNum}>
											{position.goals - position.goalsAgaints}
										</TableRowColumn>
									</TableRow>
								))}
							</TableBody>
						</Table>
						{/* <div className={styles.leyenda}>
							<div className={styles.champions}>Champions League</div>
							<div className={styles.europa}>Europa League</div>
							<div className={styles.descenso}>Descenso</div>
						</div> */}
						{matches.length > 0 && (
							<div className={styles.boxJornada}>
								<div className={styles.jornada}>
									<DropDownMenu
										className={styles.dropdown}
										value={this.state.journey}
										onChange={this.handleJourneyChange}
									>
										{matches.map((_, index) => (
											<MenuItem
												key={`journey-${index + 1}`}
												value={index}
												primaryText={`Jornada ${index + 1}`}
											/>
										))}
									</DropDownMenu>
									<Table selectable={false}>
										<TableBody displayRowCheckbox={false} stripedRows>
											{matches[this.state.journey].map(match => (
												<TableRow key={match.match.id}>
													<TableRowColumn
														className={styles.jShield}
														style={{ backgroundImage: `url(${match.host.logo})` }}
													/>
													<TableRowColumn
														className={styles.jTeam}
													>
														{match.host.name}
													</TableRowColumn>
													<TableRowColumn
														className={styles.jVs}
													>
												VS
													</TableRowColumn>
													<TableRowColumn
														className={styles.jTeam}
														style={{ textAlign: 'right' }}
													>
														{match.guest.name}
													</TableRowColumn>
													<TableRowColumn
														className={styles.jShield}
														style={{ backgroundImage: `url(${match.guest.logo})` }}
													/>
												</TableRow>
											))}

										</TableBody>
									</Table>
								</div>
							</div>
						)}
					</div>
					<div className={styles.sidebar}>
						{ /* <DropDownMenu
							style={{ width: '100%' }}
							value={this.state.value}
							onChange={this.handleChange}
						>
							<MenuItem value={1} primaryText="Temporada 2017/2018" />
							<MenuItem value={2} primaryText="Temporada 2016/2017" />
							<MenuItem value={3} primaryText="Temporada 2015/2016" />
							<MenuItem value={4} primaryText="Temporada 2014/2015" />
							<MenuItem value={5} primaryText="Temporada 2013/2014" />
						</DropDownMenu>
						*/ }
						{bestScorers.length > 0 && (
							<div className={styles.boxScorers}>
								<h4 className={styles.boxTitle}>Maximos goleadores</h4>
								<div className={styles.box} style={{ backgroundColor: '#3598dc' }}>
									{bestScorers.map(scorer => (
										<div key={`${scorer.player.id}-goals`} className={styles.flex}>
											<div className={styles.playerImg}>
												<img src={scorer.player.photo} alt="*" />
											</div>
											<div className={styles.item}>
												<span>{scorer.goals} goles</span>
												<div className={styles.playerName}>
													{scorer.player.name}
												</div>
											</div>
										</div>
									))}

								</div>
							</div>
						)}
						{bestAssisters.length > 0 && (
							<div className={styles.boxAssisters}>
								<h4 className={styles.boxTitle}>Maximos asistentes</h4>
								<div className={styles.box} style={{ backgroundColor: '#e7505a' }}>
									{bestAssisters.map(assister => (
										<div key={`${assister.player.id}-goals`} className={styles.flex}>
											<div className={styles.playerImg}>
												<img src={assister.player.photo} alt="*" />
											</div>
											<div className={styles.item}>
												<span>{assister.assists} asist.</span>
												<div className={styles.playerName}>
													{assister.player.name}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

League.propTypes = {
	matches: array,
	bestScorers: array,
	bestAssisters: array,
	positions: array,
	division: object,
	history: object.isRequired,
};

League.defaultProps = {
	matches: [],
	bestScorers: [],
	bestAssisters: [],
	positions: [],
	division: {},
};

export default withRouter(League);
