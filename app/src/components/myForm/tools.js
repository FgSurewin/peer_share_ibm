export const generateState = (
	id,
	nickname,
	email,
	supplyName,
	url,
	description,
	dropDate
) => ({
	id,
	dropNickname: nickname,
	dropEmail: email,
	supplyName,
	description: description || "",
	url,
	lat: null,
	lng: null,
	show: false,
	pickNickname: null,
	pickEmail: null,
	drop: false,
	dropDate,
	pickDate: null,
});
