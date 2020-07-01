import 'normalize.css/normalize.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';
import Switch from 'react-router-dom/Switch';
import moment from 'moment';
import Route from 'react-router-dom/Route';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green100, green500, green700 } from 'material-ui/styles/colors';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import config from '../../../config';

import './globals.css';
import styles from './styles.scss';

import Error404 from '../../pages/Error404';
import AppBar from '../AppBar';

import MyTeam from '../MyTeam';

import { AsyncHomeRoute, AsyncLoginRoute, AsyncLeagueRoute, AsyncTeamRoute } from '../../pages';
import { UserIsNotAuthenticated, UserIsAuthenticated } from '../../utils/logic/wrappers';

library.add(fab, fas);
moment.locale('es');

class DemoApp extends Component {
	getMuiThemeConfig = () =>
		getMuiTheme({
			palette: {
				primary1Color: green500,
				primary2Color: green700,
				primary3Color: green100,
			},
			userAgent: this.props.userAgent || (navigator && navigator.userAgent),
		});
	render() {
		return (
			<MuiThemeProvider muiTheme={this.getMuiThemeConfig()}>
				<div className={styles.app}>
					<Helmet>
						<html lang="en" />
						<title>{config('htmlPage.defaultTitle')}</title>
						<meta name="application-name" content={config('htmlPage.defaultTitle')} />
						<meta name="description" content={config('htmlPage.description')} />
						<meta charSet="utf-8" />
						<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
						<meta name="viewport" content="width=device-width, initial-scale=1" />
						<meta name="msapplication-TileColor" content="#2b2b2b" />
						<meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
						<meta name="theme-color" content="#2b2b2b" />
						<title>{config('htmlPage.defaultTitle')}</title>
						<link
							rel="apple-touch-icon-precomposed"
							sizes="152x152"
							href="/favicons/apple-touch-icon-152x152.png"
						/>
						<link
							rel="apple-touch-icon-precomposed"
							sizes="144x144"
							href="/favicons/apple-touch-icon-144x144.png"
						/>
						<link
							rel="apple-touch-icon-precomposed"
							sizes="120x120"
							href="/favicons/apple-touch-icon-120x120.png"
						/>
						<link
							rel="apple-touch-icon-precomposed"
							sizes="114x114"
							href="/favicons/apple-touch-icon-114x114.png"
						/>
						<link
							rel="apple-touch-icon-precomposed"
							sizes="76x76"
							href="/favicons/apple-touch-icon-76x76.png"
						/>
						<link
							rel="apple-touch-icon-precomposed"
							sizes="72x72"
							href="/favicons/apple-touch-icon-72x72.png"
						/>
						<link
							rel="apple-touch-icon-precomposed"
							sizes="57x57"
							href="/favicons/apple-touch-icon-57x57.png"
						/>
						<link
							rel="apple-touch-icon-precomposed"
							sizes="60x60"
							href="/favicons/apple-touch-icon-60x60.png"
						/>
						<link
							rel="apple-touch-icon"
							sizes="180x180"
							href="/favicons/apple-touch-icon-180x180.png"
						/>
						<link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#00a9d9" />
						<link
							rel="icon"
							type="image/png"
							href="/favicons/favicon-196x196.png"
							sizes="196x196"
						/>
						<link rel="icon" type="image/png" href="/favicons/favicon-128.png" sizes="128x128" />
						<link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96" />
						<link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
						<link rel="icon" sizes="16x16 32x32" href="/favicon.ico" />
						<meta name="msapplication-TileColor" content="#2b2b2b" />
						<meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
						<meta name="msapplication-square70x70logo" content="/favicons/mstile-70x70.png" />
						<meta name="msapplication-square150x150logo" content="/favicons/mstile-150x150.png" />
						<meta name="msapplication-wide310x150logo" content="/favicons/mstile-310x150.png" />
						<meta name="msapplication-square310x310logo" content="/favicons/mstile-310x310.png" />
						<link rel="manifest" href="/manifest.json" />
						<link
							rel="stylesheet"
							href="//fonts.googleapis.com/css?family=Roboto:100,300,300italic,700,700italic"
						/>
						<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Poppins:700" />
						<link
							rel="stylesheet"
							href="//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css"
						/>
					</Helmet>
					<AppBar />
					<Switch >
						<Route
							exact
							path="/"
							component={AsyncHomeRoute}
						/>
						<Route
							path="/myteam"
							component={UserIsAuthenticated(MyTeam)}
						/>
						<Route
							path="/team/:team_id"
							component={AsyncTeamRoute}
						/>
						<Route
							path="/login"
							component={UserIsNotAuthenticated(AsyncLoginRoute)}
						/>
						<Route
							path="/leagues/:league_id/division/:division_id"
							component={AsyncLeagueRoute}
						/>
						<Route component={Error404} />
					</Switch>
				</div>
			</MuiThemeProvider>
		);
	}
}

DemoApp.propTypes = {
	userAgent: string,
};
DemoApp.defaultProps = {
	userAgent: '',
};

export default DemoApp;
