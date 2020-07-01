import React from 'react';
import { RaisedButton } from 'material-ui';
import CircularProgress from 'material-ui/CircularProgress';

const SubmitButton = ({
	text,
	legend,
	valid,
	failed,
	failedText,
	success,
	successText,
	className,
	labelStyle,
	buttonStyle,
	loading,
	classNameButton,
	type,
	// btnClass,
	...props
}) => {
	// const value = text;
	if (loading) {
		text = <CircularProgress size={25} color="white" />;
	}
	return (
		<section className={className}>
			<RaisedButton
				label={text}
				type={type || 'submit'}
				labelStyle={labelStyle}
				primary
				buttonStyle={buttonStyle}
				disabled={!valid}
				className={classNameButton}
				{...props}
			/>
			{failed && failedText && <div className="help is-danger">{failedText}</div>}
			{success && successText && <div className="help">{successText}</div>}
			{legend && <p className="legend bold">{legend}</p>}
		</section>
	);
};

export default SubmitButton;
