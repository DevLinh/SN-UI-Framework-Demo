import { actionTypes } from "@servicenow/ui-core";
import { getHttpEffect } from "./getHttpEffect";
import { createHttpEffect } from "@servicenow/ui-effect-http";
import {
	CALLER_FETCH_REQUESTED,
	CALLER_FETCH_SUCCEEDED,
	CALLER_FETCH_FAILED,
	ASSIGN_TO_FETCH_REQUESTED,
	ASSIGN_TO_FETCH_SUCCEEDED,
	ASSIGN_TO_FETCH_FAILED,
	ASSIGNMENT_GROUP_FETCH_REQUESTED,
	ASSIGNMENT_GROUP_FETCH_SUCCEEDED,
	ASSIGNMENT_GROUP_FETCH_FAILED,
	NO_DATA,
	CLOSE_RECORD,
	ATTACHEMENT_FETCH_REQUESTED,
	ATTACHEMENT_FETCH_SUCCEEDED,
	ATTACHEMENT_FETCH_FAILED,
	ATTACHEMENT_LIST_FETCH_REQUESTED,
	ATTACHEMENT_LIST_FETCH_SUCCEEDED,
	ATTACHEMENT_LIST_FETCH_FAILED,
} from "./constants";

import { CLOSE_RECORD_CLICKED } from "../constants";

export default {
	actionHandlers: {
		[actionTypes.COMPONENT_PROPERTY_CHANGED]: ({
			dispatch,
			action,
			state,
			updateState,
		}) => {
			const {
				payload: { previousValue, value },
			} = action;
			const { attachments } = state;
			if (attachments.length > 0) {
				updateState({
					path: "attachments",
					value: {},
					operation: "splice",
					start: 0,
					deleteCount: attachments.length,
				});
			}
			//for attachment
			if (value.sys_id) {
				dispatch(ATTACHEMENT_FETCH_REQUESTED, {
					class_id: value.sys_id,
					class_name: value.sys_class_name,
				});
			}

			if (value.caller_id) {
				var caller_table = value.caller_id.link
					.split("table/")[1]
					.split("/")[0];
				dispatch(CALLER_FETCH_REQUESTED, {
					table: caller_table,
					sysId: value.caller_id.value,
				});
			} else {
				// set Interal to NO value
			}
			//the parter
			if (value.assigned_to) {
				//link: "https://dev48287.service-now.com/api/now/table/x_554832_integrati_ASSIGN_TO/f754a1d82f95e0102aa2a55df699b6e2"
				var assigned_to_table = value.assigned_to.link
					.split("table/")[1]
					.split("/")[0];
				dispatch(ASSIGN_TO_FETCH_REQUESTED, {
					table: assigned_to_table,
					sysId: value.assigned_to.value,
				});
			}
			//the message mapping - this table is a special one, we need retrive the message field mapping also
			//for simple now we only retrive message mapping and the remainder then
			if (value.assignment_group) {
				var group_table = value.assignment_group.link
					.split("table/")[1]
					.split("/")[0];
				dispatch(ASSIGNMENT_GROUP_FETCH_REQUESTED, {
					table: group_table,
					sysId: value.assignment_group.value,
				});
			}
		},
		[actionTypes.COMPONENT_BOOTSTRAPPED]: ({ dispatch, properties }) => {
			const { record } = properties;

			//for attachment
			if (record.sys_id) {
				dispatch(ATTACHEMENT_FETCH_REQUESTED, {
					class_id: record.sys_id,
					class_name: record.sys_class_name,
				});
			}

			if (record.caller_id) {
				var caller_table = record.caller_id.link
					.split("table/")[1]
					.split("/")[0];
				dispatch(CALLER_FETCH_REQUESTED, {
					table: caller_table,
					sysId: record.caller_id.value,
				});
			} else {
				// set Interal to NO record
			}
			//the parter
			if (record.assigned_to) {
				//link: "https://dev48287.service-now.com/api/now/table/x_554832_integrati_ASSIGN_TO/f754a1d82f95e0102aa2a55df699b6e2"
				var assigned_to_table = record.assigned_to.link
					.split("table/")[1]
					.split("/")[0];
				dispatch(ASSIGN_TO_FETCH_REQUESTED, {
					table: assigned_to_table,
					sysId: record.assigned_to.value,
				});
			}
			//the message mapping - this table is a special one, we need retrive the message field mapping also
			//for simple now we only retrive message mapping and the remainder then
			if (record.assignment_group) {
				var group_table = record.assignment_group.link
					.split("table/")[1]
					.split("/")[0];
				dispatch(ASSIGNMENT_GROUP_FETCH_REQUESTED, {
					table: group_table,
					sysId: record.assignment_group.value,
				});
			}
		},
		[CALLER_FETCH_REQUESTED]: getHttpEffect({
			successActionType: CALLER_FETCH_SUCCEEDED,
			errorActionType: CALLER_FETCH_FAILED,
		}),
		[CALLER_FETCH_SUCCEEDED]: ({ action, updateState }) => {
			const {
				payload: { result },
			} = action;
			if (result && result.name) {
				updateState({ caller: result.name });
			}
		},
		[CALLER_FETCH_FAILED]: ({ updateState }) => {
			updateState({ caller: NO_DATA });
		},
		//for the ASSIGN_TO
		[ASSIGN_TO_FETCH_REQUESTED]: getHttpEffect({
			successActionType: ASSIGN_TO_FETCH_SUCCEEDED,
			errorActionType: ASSIGN_TO_FETCH_FAILED,
		}),
		[ASSIGN_TO_FETCH_SUCCEEDED]: ({ action, updateState }) => {
			const {
				payload: { result },
			} = action;
			if (result) {
				updateState({ assign_to: result.name });
			}
		},
		[ASSIGN_TO_FETCH_FAILED]: ({ updateState }) => {
			updateState({ assign_to: NO_DATA });
		},
		//for the message mapping
		[ASSIGNMENT_GROUP_FETCH_REQUESTED]: getHttpEffect({
			successActionType: ASSIGNMENT_GROUP_FETCH_SUCCEEDED,
			errorActionType: ASSIGNMENT_GROUP_FETCH_FAILED,
		}),
		[ASSIGNMENT_GROUP_FETCH_SUCCEEDED]: ({ action, updateState }) => {
			const {
				payload: { result },
			} = action;
			if (result && result.name) {
				updateState({ assignment_group: result.name });
			}
		},
		[ASSIGN_TO_FETCH_FAILED]: ({ updateState }) => {
			updateState({ assignment_group: NO_DATA });
		},
		[CLOSE_RECORD]: ({ dispatch }) => {
			dispatch(CLOSE_RECORD_CLICKED);
		},
		[ATTACHEMENT_FETCH_REQUESTED]: createHttpEffect(
			`api/x_554832_integrati/get_attachment/get_attachment_for_record?table_sys_id=:class_id&table_name=:class_name`,
			{
				method: "GET",
				// queryParams: ["class_id", "class_name"],
				pathParams: ["class_id", "class_name"],
				successActionType: ATTACHEMENT_FETCH_SUCCEEDED,
				errorActionType: ATTACHEMENT_FETCH_FAILED,
			}
		),
		[ATTACHEMENT_FETCH_SUCCEEDED]: ({ action, dispatch }) => {
			const {
				payload: { result },
			} = action;
			if (result.length > 0) {
				result.forEach((e) => {
					dispatch(ATTACHEMENT_LIST_FETCH_REQUESTED, {
						sysId: e,
					});
				});
			}
		},
		[ATTACHEMENT_FETCH_FAILED]: ({}) => {},
		[ATTACHEMENT_LIST_FETCH_REQUESTED]: createHttpEffect(
			`api/now/attachment/:sysId`,
			{
				method: "GET",
				// queryParams: ["class_id", "class_name"],
				pathParams: ["sysId"],
				successActionType: ATTACHEMENT_LIST_FETCH_SUCCEEDED,
				errorActionType: ATTACHEMENT_LIST_FETCH_FAILED,
			}
		),
		[ATTACHEMENT_LIST_FETCH_SUCCEEDED]: ({ updateState, action }) => {
			const {
				payload: { result },
			} = action;
			console.log(result);
			updateState({
				path: "attachments",
				value: result,
				operation: "push",
			});
		},
	},
};
