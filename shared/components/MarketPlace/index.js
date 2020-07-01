import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Market from './Market';
import Offers from './Offers';
import styles from './styles.scss';

const TYPES = {
	byMe: 'byMe',
	toMe: 'toMe',
};

class MarketPlace extends Component {
	state = {
		index: 0,
		open: false,
		type: TYPES.byMe,
	}

	changeContent = (i, type) => this.setState({ index: i, open: false, type });;

	getContent = (i) => {
		switch (i) {
		case 0:
			return <Market />;
		case 1:
			return <Offers type={this.state.type} />;
		default:
			return 'No content';
		}
	};
	getStyle = isActive => (isActive ? styles.activeButton : styles.defaultButton);

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
		const { index } = this.state;
		return (
			<div className={styles.marketplace}>
				<div className={styles.marketClose}>
					<div><FontAwesomeIcon icon="lock" /></div>
					<span>
						El mercado de fichajes en este momento esta cerrado.
						Espera a su proxima apertura.
					</span>
				</div>
				{/* <div className={styles.buttons}>
					<button
						className={this.getStyle(index === 0)}
						value={0}
						onClick={() => this.changeContent(0)}
					>
						<FontAwesomeIcon icon="store" />
						Mercado
					</button>
					<button
						className={this.getStyle(index === 1)}
						value={1}
						onClick={this.handleClick}
					>
						<FontAwesomeIcon icon="hand-holding-usd" />
						Ofertas
						<span>12</span>
					</button>
					<Popover
						open={this.state.open}
						anchorEl={this.state.anchorEl}
						anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
						targetOrigin={{ horizontal: 'left', vertical: 'top' }}
						onRequestClose={this.handleRequestClose}
					>
						<Menu>
							<MenuItem
								onClick={() => this.changeContent(1, TYPES.toMe)}
								primaryText="Ofertas Recibidas"
							/>
							<MenuItem
								onClick={() => this.changeContent(1, TYPES.byMe)}
								primaryText="Ofertas Enviadas"
							/>
						</Menu>
					</Popover>
				</div>
				{this.getContent(index)} */}

			</div>
		);
	}
}

export default MarketPlace;
