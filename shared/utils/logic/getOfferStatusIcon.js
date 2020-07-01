const STATUSES = {
	AWAITING: 'awaiting',
	DECLINED: 'declined',
	APPROVED: 'approved',
};
export default (status) => {
	switch (status) {
	case STATUSES.AWAITING:
		return { className: 'icon', icon: 'clock' };
	case STATUSES.DECLINED:
		return { className: 'iconDecline', icon: 'times' };
	case STATUSES.APPROVED:
		return { className: 'iconAccept', icon: 'check' };
	default:
		return { className: 'icon', icon: 'clock' };
	}
};
