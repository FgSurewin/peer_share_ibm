export const convertTime = (time) => {
	const date = new Date(time * 1000);
	const y = "-" + date.getFullYear();
	const m =
		(date.getMonth() + 1 < 10
			? "0" + (date.getMonth() + 1)
			: date.getMonth() + 1) + "-";
	const d = date.getDate();
	return m + d + y;
};
