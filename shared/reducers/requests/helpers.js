import { NONE, PROCESSING, SUCCESS, ERROR } from '../../constants/requestStatuses';

export const defaultStatus = () => ({
	details: '',
	status: NONE,
});

export const processingStatus = (state, action) => ({
	...state,
	details: action.payload,
	status: PROCESSING,
});

export const successStatus = (state, action) => ({
	...state,
	details: action.payload,
	status: SUCCESS,
});

export const failureStatus = (state, action) => ({
	...state,
	details: action.error,
	status: ERROR,
});

