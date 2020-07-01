import {
	required,
	validateEmail,
	validatePassword,
	validateConfirmPassword,
	minLength,
} from '../../../utils/logic/reduxFormValidators';

const validate = values => ({
	email: required(values.email) || validateEmail(values.email),
	password: validatePassword(values),
	confirm_password: validateConfirmPassword(values),
	username: required(values.username) || minLength(values.username, 4),
});
export default validate;
