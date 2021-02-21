import { NO_DATA } from "./constants";

export default function getCallerData(
	userResult,
	locationResult,
	companyResult
) {
	const { name, photo } = userResult;
	const itemOne = [
		{ lable: "Name", value: { type: "string", value: name } },
		{
			label: "Company",
			value: {
				type: "string",
				value: (companyResult && companyResult.name) || NO_DATA,
			},
		},
		{
			label: "Location",
			value: {
				type: "string",
				value: (locationResult && locationResult.name) || NO_DATA,
			},
		},
	];
	const itemTwo = [
		{
			lable: "Email",
			value: {
				type: "string",
				value: userResult.email || NO_DATA,
			},
		},
		{
			lable: "Business Phone",
			value: {
				type: "string",
				value: userResult.phone || NO_DATA,
			},
		},
		{
			lable: "City",
			value: {
				type: "string",
				value: userResult.city || NO_DATA,
			},
		},
	];

	return {
		itemOne,
		itemTwo,
		name,
		photo,
	};
}
