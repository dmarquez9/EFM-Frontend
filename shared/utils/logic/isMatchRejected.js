export default ({ host, guest }, myTeamId) => {
	const guestDeclined = myTeamId === host.id && guest.verification === false;
	const hostDeclined = myTeamId === guest.id && host.verification === false;
	if (guestDeclined || hostDeclined)
		return true;
	return false;
};
