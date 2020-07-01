import React from 'react';
import { reduxForm } from 'redux-form';
import { Types as AuthTypes } from '../../../creatorsTypes/authentication';
import { login } from '../../../actions/auth';
import SigninForm from './SigninForm';
import loginValidate from './validate';

const SigninFormContainer = props => <SigninForm {...props} />;

export default reduxForm({
	form: 'login',
	validate: loginValidate,
	onSubmit: (
		{ user, password },
		dispatch,
	) => {
		dispatch({ type: AuthTypes.LOGIN_REQUEST },);
		return login(user, password);
	},
	onSubmitSuccess: (
		response,
		dispatch,
	) => dispatch({ type: AuthTypes.LOGIN_SUCCESS, user: response.user }),
	onSubmitFail: (errors, dispatch) =>
		dispatch({ type: AuthTypes.LOGIN_FAILURE, error: errors }),
})(SigninFormContainer);
