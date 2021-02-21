import { createHttpEffect } from "@servicenow/ui-effect-http";

export const getHttpEffect = ({ successActionType, errorActionType }) => {
	return createHttpEffect(
		"/api/now/table/x_554832_integrati_message_field_mapping?sysparm_query=message_mapping.sys_id=:sysId",
		{
			pathParams: ["sysId"],
			successActionType,
			errorActionType,
		}
	);
};
