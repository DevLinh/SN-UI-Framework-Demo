import { actionTypes } from "@servicenow/ui-core";
import { getHttpEffect } from "./getHttpEffect";
import {
	MAPPING_FIELDS_FETCH_REQUESTED,
	MAPPING_FIELDS_FETCH_SUCCEEDED,
	MAPPING_FIELDS_FETCH_FAILED,
	CLOSE_MAPPING,
} from "./constants";
import { CLOSE_MAPPING_CLICKED } from "../constants";
export default {
	actionHandlers: {
		[actionTypes.COMPONENT_BOOTSTRAPPED]: ({ dispatch, properties }) => {
			const { mapping } = properties;
			if (mapping.value) {
				dispatch(MAPPING_FIELDS_FETCH_REQUESTED, {
					sysId: mapping.value,
				});
			} else {
				//
			}
		},
		[actionTypes.COMPONENT_PROPERTY_CHANGED]: ({ dispatch, action }) => {
			const {
				payload: { previousValue, value },
			} = action;
			if (value.value) {
				dispatch(MAPPING_FIELDS_FETCH_REQUESTED, {
					sysId: value.value,
				});
			} else {
				//
			}
		},
		[MAPPING_FIELDS_FETCH_REQUESTED]: getHttpEffect({
			successActionType: MAPPING_FIELDS_FETCH_SUCCEEDED,
			errorActionType: MAPPING_FIELDS_FETCH_FAILED,
		}),
		[MAPPING_FIELDS_FETCH_SUCCEEDED]: ({ action, updateState, state }) => {
			const {
				payload: { result },
			} = action;
			const { mapping_fields } = state;
			if (mapping_fields.length > 0) {
				updateState({
					path: "mapping_fields",
					value: {},
					operation: "splice",
					start: 0,
					deleteCount: mapping_fields.length,
				});
			}
			if (result.length > 0) {
				updateState({
					path: "mapping_fields",
					value: result,
					operation: "concat",
				});
			}
		},
		[MAPPING_FIELDS_FETCH_FAILED]: ({ updateState, state }) => {
			const { mapping_fields } = state;
			if (mapping_fields.length > 0) {
				updateState({
					path: "mapping_fields",
					value: {},
					operation: "splice",
					start: 0,
					deleteCount: mapping_fields.length,
				});
			}
		},
		[CLOSE_MAPPING]: ({ dispatch }) => {
			dispatch(CLOSE_MAPPING_CLICKED);
		},
	},
};
