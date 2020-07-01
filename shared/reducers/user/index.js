import { combineReducers } from 'redux';

import data from './data';
import team from './team';
import matches from './matches';
import finances from './finances';

export default combineReducers({
	data,
	team,
	matches,
	finances,
});
