import React from 'react';
import Helmet from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.scss';

function HomeRoute() {
	return (
		<div className={styles.home}>
			<Helmet>
				<title>Home</title>
			</Helmet>
			<header className={styles.header} style={{ backgroundImage: 'url(bg.jpg)' }}>
				<div className={styles.content}>
					<h2>¡Bienvenido a <br />Football Manager!</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Etiam mattis tempor mi ut fringilla.
						Pellentesque vel est orci. Donec at augue tincidunt, laoreet ex eu,
						malesuada quam.
					</p>
				</div>
				<a className={styles.readMore}>
					Read more
					<FontAwesomeIcon icon="chevron-down" />
				</a>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
					<polygon fill="white" points="0,100 100,0 100,100" />
				</svg>
			</header>
			<section className={styles.chooseTeam}>
				<div className={styles.container}>
					<div className={styles.flex}>
						<div>
							<div className={styles.icon}>
								<div><FontAwesomeIcon icon="play" /></div>
							</div>
							<h4>Elige un <span>club</span> y juega una <span>liga</span></h4>
							<p>Ciento de clubes disponibles de distintas ligas</p>
						</div>
						<div className={styles.teams}>
							<div><img src="escudos/fc-barcelona.png" alt="*" /></div>
							<div><img src="escudos/real-madrid.png" alt="*" /></div>
							<div><img src="escudos/manchester-united.png" alt="*" /></div>
							<div><img src="escudos/liverpool.png" alt="*" /></div>
							<div><img src="escudos/juventus.png" alt="*" /></div>
							<div><img src="escudos/bayern.png" alt="*" /></div>
							<div><img src="escudos/psg.png" alt="*" /></div>
							<div><img src="escudos/milan.png" alt="*" /></div>
							<div className={styles.andmore}>y mas..</div>
						</div>
					</div>
				</div>
			</section>
			<section className={styles.choosePlayers}>
				<svg className={styles.top} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
					<polygon fill="#fff" points="0,100 0,0 100,100" />
				</svg>
				<div className={styles.container}>
					<div className={styles.flex}>
						<div>
							<img src="pick-a-player.png" alt="*" />
						</div>
						<div className={styles.right}>
							<div className={styles.icon}>
								<div><FontAwesomeIcon icon="users" /></div>
							</div>
							<h4>Elige tus <span>jugadores</span></h4>
							<p>Arma tu equipo en base del presupuesto del club</p>
						</div>
					</div>
				</div>
				<svg className={styles.bottom} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
					<polygon fill="#fff" points="0,100 100,0 100,100" />
				</svg>
			</section>
			<section className={styles.compete}>
				<div className={styles.container}>
					<div className={styles.flex}>
						<div>
							<div className={styles.icon}>
								<div><FontAwesomeIcon icon="trophy" /></div>
							</div>
							<h4><span>Compite</span> en el campo</h4>
							<p>Juega para subir en el ranking y vencer a los otros jugadores</p>
						</div>
						<div className={styles.center}>
							<img src="soccerpitch.png" alt="*" />
						</div>
					</div>
				</div>
			</section>
			<section className={styles.chooseStadium}>
				<svg className={styles.top} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
					<polygon fill="#fff" points="0,100 0,0 100,100" />
				</svg>
				<div className={styles.container}>
					<div className={styles.flex}>
						<div className={styles.center}>
							<img src="stadium.png" alt="*" />
						</div>
						<div className={styles.right}>
							<div className={styles.icon}>
								<div><FontAwesomeIcon icon="sort-amount-up" /></div>
							</div>
							<h4>Mejora tu <span>estadio</span></h4>
							<p>Aumenta de nivel tu estadio para obtener mas beneficios</p>
						</div>
					</div>
				</div>
				<svg className={styles.bottom} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
					<polygon fill="#fff" points="0,100 100,0 100,100" />
				</svg>
			</section>
			<section className={styles.homeMarket}>
				<div className={styles.container}>
					<div className={styles.flex}>
						<div>
							<div className={styles.icon}>
								<div><FontAwesomeIcon icon="exchange-alt" /></div>
							</div>
							<h4>Utiliza el <span>mercado</span> para mejorar tu equipo</h4>
							<p>Intercambia y/o compra jugadores</p>
						</div>
						<div className={styles.center}>
							<img src="mercado-de-fichajes.png" alt="*" />
						</div>
					</div>
				</div>
			</section>
			<footer>
				<div className={styles.container}>
					All rights reserved Football Manager &copy; 2018
				</div>
			</footer>
		</div>
	);
}

export default HomeRoute;
