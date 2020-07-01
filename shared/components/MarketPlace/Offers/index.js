import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { string, func, bool } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles.scss';
import LoadingBox from '../../LoadingBox';

import {
	fetchOffersByMe as fetchOffersByMeAction,
	fetchOffersToMe as fetchOffersToMeAction,
} from '../../../actions/market';
import OfferBox from './Offer';
import { getRequestStatus } from '../../../selectors';
import { PROCESSING } from '../../../constants/requestStatuses';

const style = {
	checkbox: {
		paddingTop: 12,
	},
	labelCheck: {
		fontWeight: 'normal',
	},
};

const LABELS = {
	byMe: 'Ofertas Enviadas',
	toMe: 'Ofertas Recibidas',
};

const TYPES = {
	byMe: 'byMe',
	toMe: 'toMe',
};

class Offers extends PureComponent {
	state = {
		open: false,
	};
	componentDidMount = () => {
		this.props.fetchOffersToMe();
		this.props.fetchOffersByMe();
	}
	handleClick = (event) => {
		event.preventDefault();
		this.setState({
			open: true,
			anchorEl: event.currentTarget,
		});
	};

	handleRequestClose = () => {
		this.setState({
			open: false,
		});
	};
	render() {
		return (
			<div className={styles.offers}>
				{/* <h4>
					{LABELS[this.props.type]}
					<RaisedButton
						className={styles.btnFilter}
						label="Filtrar"
						onClick={this.handleClick}
						icon={<FontAwesomeIcon icon="filter" />}
					/>
					<Popover
						open={this.state.open}
						anchorEl={this.state.anchorEl}
						anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
						targetOrigin={{ horizontal: 'left', vertical: 'top' }}
						onRequestClose={this.handleRequestClose}
					>
						<Menu>
							<MenuItem>
								<Checkbox
									style={style.checkbox}
									label="Ofertas aceptadas"
									labelStyle={style.labelCheck}
									checked
								/>
							</MenuItem>
							<MenuItem>
								<Checkbox
									style={style.checkbox}
									label="Ofertas en espera"
									labelStyle={style.labelCheck}
									checked
								/>
							</MenuItem>
							<MenuItem>
								<Checkbox
									style={style.checkbox}
									label="Ofertas declinadas"
									labelStyle={style.labelCheck}
									checked
								/>
							</MenuItem>
						</Menu>
					</Popover>
				</h4> */}
				{this.props.loading && <LoadingBox />}
				{!this.props.loading && (
					<div className={styles.flex}>
						{this.props[this.props.type].map(entry =>
							(<OfferBox
								key={entry.offer.id}
								entry={entry}
								showActions={this.props.type === TYPES.toMe}
							/>),
						)}
					</div>
				)}
			</div>
		);
	}
}
Offers.propTypes = {
	fetchOffersByMe: func.isRequired,
	fetchOffersToMe: func.isRequired,
	type: string.isRequired,
	loading: bool.isRequired,
};
const mapStateToProps = state => ({
	byMe: state.market.offersByMe,
	toMe: state.market.offersToMe,
	loading: getRequestStatus('offersByMe')(state).status === PROCESSING ||
	getRequestStatus('offersToMe')(state).status === PROCESSING,
});
export default connect(
	mapStateToProps,
	{
		fetchOffersByMe: fetchOffersByMeAction,
		fetchOffersToMe: fetchOffersToMeAction,
	},
)(Offers);
