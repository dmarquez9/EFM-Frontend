import { combineReducers } from 'redux';

import offersByMe from './offersByMe';
import offersToMe from './offersToMe';
import availables from './availables';

export default combineReducers({
	offersByMe,
	offersToMe,
	availables,
});
