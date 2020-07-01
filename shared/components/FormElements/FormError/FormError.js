import React from 'react';

const FormError = ({ touched, error, warning }) =>
	touched
		? (error && (
			<p className="help is-danger">
				<i className="icon-alert" />
				{error}
			</p>
		)) ||
			(warning && <p className="help">{warning}</p>) ||
			null
		: null;

export default FormError;
