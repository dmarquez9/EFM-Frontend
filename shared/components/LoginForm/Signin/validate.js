import {
	validateEmail,
	validatePassword,
	required,
} from '../../../utils/logic/reduxFormValidators';

const validate = ({ email, password }) => ({
	email: required(email) || validateEmail(email),
	password:
		required(password) ||
		validatePassword({
			password,
		}),
});

export default validate;
