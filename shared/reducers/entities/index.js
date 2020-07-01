import { combineReducers } from 'redux';
import teams from './teams';
import players from './players';

export default combineReducers({
	teams,
	players,
});
