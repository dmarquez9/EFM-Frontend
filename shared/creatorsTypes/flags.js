import { createActions } from 'reduxsauce';
import { PREFIX } from './constants';

const { Types, Creators } = createActions({
	changeCurrentSeason: ['seasonId'],
}, { prefix: PREFIX });

export { Types, Creators };
