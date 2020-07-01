export default (myTeamId, { guest, host }) => {
	switch (true) {
	case (guest.goals > host.goals) && guest.id === myTeamId:
	case (host.goals > guest.goals) && host.id === myTeamId:
		return 'win';
	case (guest.goals < host.goals) && guest.id === myTeamId:
	case (host.goals < guest.goals) && host.id === myTeamId:
		return 'lose';
	case (guest.goals === host.goals):
		return 'tie';
	default:
		return '';
	}
};
