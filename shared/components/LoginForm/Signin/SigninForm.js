import React from 'react';
import { string, bool, func } from 'prop-types';
import { TextInput, BasicLayout, SubmitButton } from '../../FormElements';
import styles from './styles.scss';

const SigninForm = ({ error, handleSubmit, valid, submitting }) => (
	<BasicLayout onSubmit={handleSubmit} className={styles.signin}>
		<TextInput
			className={styles.w100}
			label="Nombre de Usuario o correo electrónico"
			labelStyle={styles.inputTitle}
			type="text"
			name="user"
			inputConfig={{
				hintText: 'Escribe aqui',
				fullWidth: true,
				name: 'user',
				id: 'user',
			}}
		/>
		<TextInput
			className={styles.w100}
			label="Contraseña"
			labelStyle={styles.inputTitle}
			type="password"
			name="password"
			placeholder="*******"
			inputConfig={{
				hintText: '*******',
				fullWidth: true,
				name: 'password',
				id: 'password',
			}}
		/>
		{error && <strong className={styles.errorMessage}>{error}</strong>}

		<SubmitButton
			text="Iniciar sesión"
			loading={submitting}
			valid={valid}
			primary
			className={styles.loginBot}
		/>
	</BasicLayout>
);

SigninForm.propTypes = {
	error: string,
	handleSubmit: func.isRequired,
	valid: bool.isRequired,
	submitting: bool.isRequired,
};
SigninForm.defaultProps = {
	error: null,
};

export default SigninForm;
