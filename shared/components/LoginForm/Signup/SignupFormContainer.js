import React from 'react';
import { reduxForm } from 'redux-form';
import { signup } from '../../../actions/auth';
import validate from './validate';
import SignupForm from './SignupForm';
import { Types as AuthTypes } from '../../../creatorsTypes/authentication';

const SignupFormContainer = props => <SignupForm {...props} />;

export default reduxForm({
	form: 'signup',
	validate,
	onSubmit: ({ name, lastName, password, username, email }, dispatch) => {
		dispatch({ type: AuthTypes.SIGNUP_REQUEST });
		return signup(
			{
				email,
				password,
				username,
				fullname: `${name} ${lastName}`,
			},
		);
	},
	onSubmitSuccess: (
		response,
		dispatch,
	) => dispatch({ type: AuthTypes.SIGNUP_SUCCESS, user: response.user }),
	onSubmitFail: (errors, dispatch) =>
		dispatch({ type: AuthTypes.SIGNUP_FAILURE, error: errors }),

})(SignupFormContainer);
