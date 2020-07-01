import React from 'react';
import { string, bool, func } from 'prop-types';
import styles from './styles.scss';
import { TextInput, BasicLayout, SubmitButton } from '../../FormElements';

const SignupForm = ({ error, handleSubmit, valid, submitting }) => (
	<BasicLayout className={styles.signupForm} onSubmit={handleSubmit}>
		<TextInput
			className={styles.w50}
			label="Nombre"
			labelStyle={styles.inputTitle}
			required
			name="name"
			type="text"
			placeholder="Lionel"
			inputConfig={{
				fullWidth: true,
				hintText: 'Lionel',
			}}
		/>
		<TextInput
			className={styles.w50}
			label="Apellido"
			labelStyle={styles.inputTitle}
			name="lastName"
			required
			type="text"
			placeholder="Messi"
			inputConfig={{
				fullWidth: true,
				hintText: 'Messi',
			}}
		/>
		<TextInput
			className={styles.w100}
			label="Correo Electrónico"
			labelStyle={styles.inputTitle}
			required
			name="email"
			type="email"
			placeholder="messi@thebest.com"
			inputConfig={{
				fullWidth: true,
				hintText: 'messi@thebest.com',
			}}
		/>
		<TextInput
			className={styles.w100}
			label="Usuario"
			labelStyle={styles.inputTitle}
			required
			name="username"
			type="text"
			placeholder="MessiTheBest"
			inputConfig={{
				fullWidth: true,
				hintText: 'MessiTheBest',
			}}
		/>
		<TextInput
			className={styles.w50}
			label="Contraseña"
			labelStyle={styles.inputTitle}
			name="password"
			type="password"
			placeholder="********"
			inputConfig={{
				fullWidth: true,
				hintText: '********',
			}}
		/>
		<TextInput
			className={styles.w50}
			label="Re-Ingrese su contraseña"
			labelStyle={styles.inputTitle}
			required
			name="confirm_password"
			type="password"
			placeholder="********"
			inputConfig={{
				fullWidth: true,
				hintText: '********',
			}}
		/>
		{error && <strong className={styles.errorMessage}>{error}</strong>}
		<SubmitButton
			text="Registrarse"
			primary
			valid={valid}
			loading={submitting}
			className={styles.signupBot}
		/>
	</BasicLayout>
);
SignupForm.propTypes = {
	error: string,
	handleSubmit: func.isRequired,
	valid: bool.isRequired,
	submitting: bool.isRequired,
};

SignupForm.defaultProps = {
	error: null,
};
export default SignupForm;
