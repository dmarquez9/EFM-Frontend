import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import moment from 'moment';
import styles from './styles.scss';

class Game extends PureComponent {
	render() {
		return (
			<div className={styles.Game}>
				<div className={styles.home}>
					<img src={this.props.home.logo} alt={this.props.home.name} />
					{this.props.home.name}
				</div>
				<div className={styles.content}>
					{!isEmpty(this.props.competition) && <span>{this.props.competition}</span>}
					<div className={styles.score}>
						<span>{this.props.home.goals}</span> - <span>{this.props.away.goals}</span>
					</div>
					<p>{moment(this.props.date).format('DD MMM YYYY - h:mm A', 'es')}</p>
				</div>
				<div className={styles.away}>
					<img src={this.props.away.logo} alt={this.props.away.name} />
					{this.props.away.name}
				</div>
			</div>
		);
	}
}

Game.propTypes = {
	competition: PropTypes.string,
	home: PropTypes.object.isRequired,
	away: PropTypes.object.isRequired,
	date: PropTypes.string.isRequired,
};

Game.defaultProps = {
	competition: '',
};

export default Game;
