const countDecimals = (number) => {
	let match = (`${number}`).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
	if (!match) { return 0; }
	return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
};
const abbreviateNumber = (number, decPlaces) => {
	const negative = number < 0;
	const places = Math.pow(10, decPlaces);
	const abbrev = ['K', 'M', 'B', 'T'];
	if(negative) number *= -1;
	for (let i = abbrev.length - 1; i >= 0; i--) {
		const size = Math.pow(10, (i + 1) * 3);
		if (size <= number) {
			number = Math.round(number * places / size) / places;
			if ((number === 1000) && (i < abbrev.length - 1)) {
				number = 1;
				i++;
			}
			number += abbrev[i];
			break;
		}
	}
	if (typeof number !== 'string') {
		const decimals = countDecimals(number);
		if (decimals >= 4)
			return number.toFixed(4);
		return negative ? `-${number}` : number;
	}
	return negative ? `-${number}` : number;
};

export default abbreviateNumber;
