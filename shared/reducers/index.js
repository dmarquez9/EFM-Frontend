import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import posts, * as FromPosts from './posts';
import requests from './requests';
import user from './user';
import entities from './entities';
import seasons from './seasons';
import divisions from './divisions';
import leagues from './leagues';
import flags from './flags';
import market from './market';

const rootReducer = combineReducers({
	posts,
	requests,
	user,
	entities,
	seasons,
	form: formReducer,
	divisions,
	leagues,
	flags,
	market,
});

export function getPostById(state, id) {
	return FromPosts.getById(state.posts, id);
}

export default rootReducer;
