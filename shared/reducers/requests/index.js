import { combineReducers } from 'redux';

import login from './login';
import signup from './signup';
import myMatches from './myMatches';
import teamPlayers from './teamPlayers';
import reportMatch from './reportMatch';
import division from './division';
import verifyMatch from './verifyMatch';
import team from './team';
import offersByMe from './offersByMe';
import offersToMe from './offersToMe';
import market from './market';
import postInMarket from './postInMarket';
import offerPlayer from './offerPlayer';
import changeOfferStatus from './changeOfferStatus';
import myFinances from './myFinances';

export default combineReducers({
	login,
	signup,
	myMatches,
	teamPlayers,
	reportMatch,
	division,
	verifyMatch,
	team,
	offersByMe,
	offersToMe,
	market,
	postInMarket,
	offerPlayer,
	changeOfferStatus,
	myFinances,
});
