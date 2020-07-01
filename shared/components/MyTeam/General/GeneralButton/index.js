import React, { PureComponent } from 'react';
import PropTypes, { string, object } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.scss';

class GeneralButton extends PureComponent {
	render() {
		return (
			<div
				className={styles.generalButton}
				style={{
					backgroundColor: this.props.bgColor,
				}}
			>
				<span className={styles.buttonValue}>{this.props.value}</span>
				<span className={styles.buttonLabel}>{this.props.label}</span>
				<FontAwesomeIcon className={styles.buttonIcon} icon={this.props.icon} />
			</div>
		);
	}
}

GeneralButton.PropTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	bgColor: PropTypes.string.isRequired,
	icon: PropTypes.oneOf([string, object]).isRequired,
};

export default GeneralButton;
