export default (array, size) => {
	const arrayLength = array.length;
	const tempArray = [];
	for (let index = 0; index < arrayLength; index += size) {
		const chunk = array.slice(index, index + size);
		tempArray.push(chunk);
	}
	return tempArray;
};
