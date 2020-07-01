import { isNumber, moreThanZero } from '../../../../utils/logic/reduxFormValidators';

const validate = ({ terraces, tribunes, vip, fastfoods, shops }) => ({
	terraces: isNumber(terraces, false) || moreThanZero(terraces),
	tribunes: isNumber(tribunes, false) || moreThanZero(tribunes),
	vip: isNumber(vip, false) || moreThanZero(vip),
	fastfoods: isNumber(fastfoods, false) || moreThanZero(fastfoods),
	shops: isNumber(shops, false) || moreThanZero(shops),
});

export default validate;
