import { isNumber, atLeast } from '../../../../utils/logic/reduxFormValidators';

const validate = ({ hostGoals, guestGoals }) => ({
	hostGoals: isNumber(hostGoals) || atLeast(hostGoals, 0),
	guestGoals: isNumber(guestGoals) || atLeast(guestGoals, 0),
});

export default validate;
