
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { isEmpty } from 'lodash';
import { reduxForm, SubmissionError } from 'redux-form';
import { func, bool, array, number, string, object } from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { Checkbox } from 'material-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Table,
	TableBody,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import { getMyTeam, getRequestStatus } from '../../../selectors';
import { TextInput, BasicLayout, SubmitButton } from '../../FormElements';
import styles from './styles.scss';
import { isNumber, enoughMoney, atLeast } from '../../../utils/logic/reduxFormValidators';
import { offerPlayer as offerPlayerAction } from '../../../actions/market';
import { PROCESSING } from '../../../constants/requestStatuses';

class MakeOffer extends PureComponent {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			players: [],
		};
	}
	renderActions = () => (
		<div className={styles.actionsContainer}>
			<FlatButton
				label="Cancelar"
				primary
				onClick={this.props.handleClose}
			/>
			<SubmitButton
				text="Ofertar"
				primary
				keyboardFocused
				loading={this.props.loading}
				valid={this.props.valid}
			/>
		</div>
	)
	setPlayer = playerId => () => {
		this.setState(prevState => ({
			players: prevState.players.includes(playerId) ?
				prevState.players.filter(e => e !== playerId) :
				[...prevState.players, playerId],
		}));
	}

	async onSubmit({ offer }) {
		const { error } = await this.props.offerPlayer(
			Number(offer),
			this.props.marketId,
			this.state.players,
		);
		if (error)
			throw new SubmissionError({ _error: error.message });
		else
			this.props.handleClose(true);
	}
	render() {
		return (
			<Dialog
				modal={false}
				open={this.props.open}
				onRequestClose={this.props.handleClose}
				autoScrollBodyContent
			>
				<BasicLayout onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<h3 className={styles.modalTitle}>
						<div className={styles.image} style={{ backgroundImage: `url(${this.props.player.photo})` }} />
						{this.props.player.name}
					</h3>
					<p>{this.props.description}</p>
					<hr className={styles.hr} />
					<div className={styles.money}>
						<FontAwesomeIcon icon="dollar-sign" />
						<TextInput
							name="offer"
							type="number"
							inputConfig={{
								underlineShow: false,
								hintText: 'Dinero a Ofrecer',
								type: 'number',
								min: 0,
							}}
						/>
					</div>
					<hr className={styles.hr} />
					<Table
						selectable={false}
						className={styles.modalPlayers}
					>
						<TableBody displayRowCheckbox={false}>
							{this.props.myPlayers.map(p => (
								<TableRow key={p.id} selectable={false}>
									<TableRowColumn className={styles.colCheckbox}>
										<Checkbox
											checked={this.state.players.includes(p.id)}
											onCheck={this.setPlayer(p.id)}
										/>
									</TableRowColumn>
									<TableRowColumn
										className={styles.colImage}
										style={{ backgroundImage: `url(${p.photo})` }}
									/>
									<TableRowColumn>{p.name}</TableRowColumn>
								</TableRow>
							))}
						</TableBody>
					</Table>
					{!isEmpty(this.props.error) &&
						<strong className={styles.errorMessage}>{this.props.error}</strong>
					}
					{this.renderActions()}
				</BasicLayout>
			</Dialog>
		);
	}
}
MakeOffer.propTypes = {
	handleSubmit: func.isRequired,
	handleClose: func.isRequired,
	myPlayers: array.isRequired,
	open: bool.isRequired,
	description: string,
	player: object.isRequired,
	valid: bool.isRequired,
	marketId: number.isRequired,
	offerPlayer: func.isRequired,
	loading: bool.isRequired,
	error: string,
};

MakeOffer.defaultProps = {
	description: '',
	error: '',
};

const mapStateToProps = (state) => {
	const myTeam = getMyTeam(state);
	return {
		myPlayers: myTeam.players || [],
		balance: myTeam.balance || 0,
		loading: getRequestStatus('offerPlayer')(state).status === PROCESSING,
	};
};
const validate = ({ offer }, { balance }) => ({
	offer: isNumber(offer, false) || atLeast(offer, 0, false) || enoughMoney(offer, balance),
});

const formName = 'MakeOffer';

export default compose(
	connect(
		mapStateToProps,
		{ offerPlayer: offerPlayerAction },
	),
	reduxForm({
		form: formName,
		validate,
		initialValues: { offer: 0 },
		forceUnregisterOnUnmount: true,
	}),
)(MakeOffer);
