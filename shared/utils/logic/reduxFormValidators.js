import { isEmpty, trim, isString } from 'lodash';

export const ERRORS = {
	REQUIRED: 'Este campo es obligatorio',
	INVALID: 'Valor invalido',
	PASSWORD_SHORT_WARN: 'Contraseña corta',
	PASSWORD_SHORT_ERROR: 'La contraseña debe ser mas larga',
	PASSWORD_NOT_EQUAL: 'Las contraseñas no son iguales',
	MIN_BIGGER_MAX: 'Valor minimo maximo',
	MAX_SMALLER_MIN: 'El valor debe ser mayor',
	NOT_A_NUMBER: 'No es un numero',
	OUT_OF_RANGE: 'Fuera de rango',
	MIN_LENGTH: 'El texto debe ser mas largo.',
	NO_ETHERIUM: 'invalid_address',
	WRONG_WORD: 'wrong_word',
	MAX_FILE_SIZE: 'max_file_size',
	REVALIDATE_RECAPTCHA: 'revalidate_recaptcha',
	RATE_INVALID: 'El minimo es mayor a 0',
	ENOUGH_MONEY: 'No tienes dinero suficiente',
};

export const minLength = (str, minLen) => (str.length < minLen ? ERRORS.MIN_LENGTH : null);

const isNumeric = x => (typeof x === 'number' || typeof x === 'string') && !isNaN(Number(x));

export const isNumber = (field, required = true) =>
	!required ? null : (isNumeric(field) ? null : ERRORS.NOT_A_NUMBER);

export const atLeast = (value, bound, required = true) => {
	if (!value && !required)
		return null;
	switch (true) {
	case isNaN(value) || Number(value) < Number(bound):
		return ERRORS.MAX_SMALLER_MIN;
	default:
		return null;
	}
};
export const atLeastEq = (value, bound) => {
	switch (true) {
	case Number(value) <= Number(bound):
		return ERRORS.MAX_SMALLER_MIN;
	default:
		return null;
	}
};

export const moreThanZero = bound => (atLeastEq(bound, 0) ? ERRORS.RATE_INVALID : null);

export const biggerThan = (maxNum, minNum) => {
	switch (true) {
	case Number(minNum) > Number(maxNum):
		return ERRORS.MAX_SMALLER_MIN;
	default:
		return null;
	}
};

export const required = field =>
	typeof field === 'string'
		? isEmpty(field) ? ERRORS.REQUIRED : null
		: isNumeric(field) ? null : ERRORS.REQUIRED;

const emailRegex = /^(([^<>()\],;:\s@]+(\.[^<>()\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i;

export const validateEmail = email => (emailRegex.test(email) ? null : ERRORS.INVALID);

export const validatePassword = ({ password, optional }) => {
	switch (true) {
	case !password && optional:
		return null;
	case !password && !optional:
		return ERRORS.REQUIRED;
	case password.length < 6:
		return ERRORS.PASSWORD_SHORT_ERROR;
	default:
		return null;
	}
};

export const validateConfirmPassword = ({ password, confirm_password }) => {
	switch (true) {
	case !confirm_password:
		return ERRORS.REQUIRED;
	case password !== confirm_password:
		return ERRORS.PASSWORD_NOT_EQUAL;
	default:
		return null;
	}
};

export const validateString = value =>
	(!isString(value) || trim(value) === '') && ERRORS.MIN_LENGTH;

export const enoughMoney = (value, balance) =>
	Number(value) <= Number(balance) ? null : ERRORS.ENOUGH_MONEY;
