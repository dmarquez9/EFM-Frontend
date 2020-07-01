import React from 'react';
import Paper from 'material-ui/Paper';
import styles from './styles.scss';
import LoginForm from '../../components/LoginForm';

const LoginRoute = () => (
	<div className={styles.login}>
		<Paper zDepth={2} className={styles.paper}>
			<div className={styles.container}>
				<div className={styles.textBox}>
					<p>
						<span>Football Manager</span> registrate y solicita un equipo<br />
						<br />
					</p>
					<p>
						Conviértete en manager.
					</p>
					<p>
						Mejora tu equipo intercambiando jugadores.
					</p>
					<p>
						Amplia tu estadio y genera más ingresos.
					</p>
					<p>
						Compite en el campo y guía a tu equipo a la gloria.
					</p>
				</div>
				<div>
					<LoginForm />
				</div>
			</div>
		</Paper>
	</div>
);

export default LoginRoute;
