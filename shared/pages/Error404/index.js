import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'
import styles from './styles.scss';

class Error404 extends Component {
	componentWillMount() {
		const { staticContext } = this.props;
		if (staticContext) {
			staticContext.missed = true;
		}
	}

	render() {
		return (
			<div className={styles.page404}>
				<img src="404.png" alt="*" />
				<h2>Page 404 not found</h2>
				<p>La pagina que estabas buscando ha sido movida o eliminada</p>
				<Link to="/"><RaisedButton className={styles.btn404} label="Volver al inicio" /></Link>
			</div>
		);
	}
}

Error404.propTypes = {
	staticContext: PropTypes.objectOf(PropTypes.any),
};

Error404.defaultProps = {
	staticContext: {},
};

export default Error404;
