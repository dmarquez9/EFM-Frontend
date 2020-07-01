import React from 'react';
import { bool, element } from 'prop-types';
import Paper from 'material-ui/Paper';
import styles from './styles.scss';

const Wrapper = ({ children, showPaper }) => showPaper ?
	<Paper zDepth={2} className={styles.paper}>
		{children}
	</Paper> : <div>{children}</div>;

Wrapper.propTypes = {
	showPaper: bool.isRequired,
	children: element.isRequired,
};

const LoadingBox = ({ showPaper }) => (
	<div className={styles.loadingContainer}>
		<Wrapper showPaper={showPaper}>
			<span className={styles.loading}>
				<span />
				<span />
				<span />
				<span />
			</span>
		</Wrapper>
	</div>
);

LoadingBox.propTypes = {
	showPaper: bool,
};

LoadingBox.defaultProps = {
	showPaper: true,
};
export default LoadingBox;
