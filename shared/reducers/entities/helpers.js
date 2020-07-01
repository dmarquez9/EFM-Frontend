import { union, keyBy, map, get } from 'lodash';

export const initialState = () => ({
	byId: {},
	allIds: [],
});

export const addEntries = (state, entries) => ({
	...state,
	byId: { ...state.byId, ...keyBy(entries, 'id') },
	allIds: union(state.allIds, map(entries, 'id')),
});

export const addManyById = entities => (state, action) => ({
	...state,
	byId: { ...state.byId, ...keyBy(get(action, entities, {}), 'id') },
	allIds: union(state.allIds, map(get(action, entities, {}), 'id')),

});

export const addManyPlain = entities => (state, action) => {
	const keys = get(action, entities, {});

	return {
		...state,
		values: keys,
		error: null,
		fetching: false,

	};
};

export const addById = entity => (state, action) => ({
	allIds: [...state.allIds, get(action, entity, {}).id],
	byId: {
		...state.byId,
		[get(action, entity, {}).id]: action[entity],
	},
});

