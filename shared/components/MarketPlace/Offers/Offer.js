import React, { PureComponent } from 'react';
import { object, bool, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Table,
	TableBody,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import Snackbar from 'material-ui/Snackbar';

import { Scrollbars } from 'react-custom-scrollbars';
import styles from './styles.scss';
import getOfferStatusIcon from '../../../utils/logic/getOfferStatusIcon';
import {
	rejectOffer as rejectOfferAction,
	approveOffer as approveOfferAction,
} from '../../../actions/market';
import { PROCESSING } from '../../../constants/requestStatuses';
import { getRequestStatus } from '../../../selectors';

const AWAITING = 'awaiting';

class OfferBox extends PureComponent {
	state = {
		snackbarOpen: false,
		snackBarMessage: '',
	}

	rejectOffer = () => {
		const { rejectOffer, entry } = this.props;
		rejectOffer(entry.id, entry.offer.id);
	}
	approveOffer = () => {
		const { approveOffer, entry } = this.props;
		approveOffer(entry);
	}
	componentDidUpdate = ({ offer: prevError }) => {
		if (isEmpty(prevError) && !isEmpty(this.props.error))
			this.setState({ snackbarOpen: true, snackBarMessage: this.props.error });
	}
	closeSnackbar = () => this.setState({ snackbarOpen: false })

	render() {
		const { entry, showActions, loading } = this.props;
		const { className, icon } = getOfferStatusIcon(entry.offer.state);
		return (
			<div className={styles.playerBox}>
				<div className={styles.topBox}>
					<div className={styles[className]}>
						<FontAwesomeIcon icon={icon} />
					</div>
					<div className={styles.playerImg}>
						<img src={entry.player.photo} alt="*" />
					</div>
					<div className={styles.item}>
						<h4>{entry.player.name}</h4>
						<p>{showActions ? entry.offer.teamName : entry.player.teamName}</p>
					</div>
				</div>
				<div className={styles.money}>
					<span>Dinero ofrecido</span>
					{entry.offer.price} $
				</div>
				{entry.offer.players.length > 0 && (
					<div className={styles.players}>
						<span>Jugadores ofrecidos</span>
						<Scrollbars style={{ height: '128px' }}>
							<Table selectable={false}>
								<TableBody displayRowCheckbox={false}>
									{entry.offer.players.map(({ player }, index) => (
										<TableRow key={`${entry.id}-${player.id}-${index}`}>
											<TableRowColumn
												className={styles.colImage}
												style={{ backgroundImage: `url(${player.photo})` }}
											/>
											<TableRowColumn>{player.name}</TableRowColumn>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Scrollbars>
					</div>
				)}
				{(showActions && entry.offer.state === AWAITING) && (
					<div className={styles.btnBox}>
						<button
							onClick={this.approveOffer}
							className={styles.btnAccept}
							disabled={loading}
						>
							<FontAwesomeIcon icon="check" />
							Aceptar
						</button>
						<button
							onClick={this.rejectOffer}
							className={styles.btnCancel}
							disabled={loading}
						>
							<FontAwesomeIcon icon="times" />
							Rechazar
						</button>
					</div>
				)}
				<Snackbar
					open={this.state.snackbarOpen}
					message={this.state.snackBarMessage}
					autoHideDuration={4000}
					onRequestClose={this.closeSnackbar}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loading: getRequestStatus('changeOfferStatus')(state).status === PROCESSING,
	error: getRequestStatus('changeOfferStatus')(state).details || '',
});

OfferBox.propTypes = {
	showActions: bool.isRequired,
	entry: object.isRequired,
	loading: bool.isRequired,
	rejectOffer: func.isRequired,
	error: string.isRequired,
	approveOffer: func.isRequired,
};
export default connect(
	mapStateToProps,
	{
		rejectOffer: rejectOfferAction,
		approveOffer: approveOfferAction,
	},
)(OfferBox);
