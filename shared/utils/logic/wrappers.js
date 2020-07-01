import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { isEmpty } from 'lodash';
import { HOME, LOGIN } from '../../constants/routes';
import { PROCESSING } from '../../constants/requestStatuses';

const locationHelper = locationHelperBuilder({});

const userIsAuthenticatedDefaults = {
	authenticatedSelector: state => !isEmpty(state.user.data),
	authenticatingSelector: state => state.requests.login === PROCESSING,
	wrapperDisplayName: 'UserIsAuthenticated',
};

export const UserIsAuthenticated = connectedRouterRedirect({
	...userIsAuthenticatedDefaults,
	redirectPath: LOGIN,
});

const userIsNotAuthenticatedDefaults = {
	// Want to redirect the user when they are done loading and authenticated
	authenticatedSelector: state => isEmpty(state.user.data),
	authenticatingSelector: state => state.requests.login === PROCESSING,
	wrapperDisplayName: 'UserIsNotAuthenticated',
};

export const UserIsNotAuthenticated = connectedRouterRedirect({
	...userIsNotAuthenticatedDefaults,
	redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || HOME,
	allowRedirectBack: false,
});
