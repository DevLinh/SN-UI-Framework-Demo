import { actionTypes } from "@servicenow/ui-core";
import { createHttpEffect } from "@servicenow/ui-effect-http";
import {
	INTEGRATION_MESSAGE_LOAD_REQUESTED,
	INTEGRATION_MESSAGE_LOAD_STARTED,
	INTEGRATION_MESSAGE_LOAD_SUCCEEDED,
	INTEGRATION_MESSAGE_LOAD_FAILED,
	URL_TABLE_INTEGRATION_MESSAGE,
	FETCH_ITEM_REQUESTED,
	FETCH_ITEM_SUCCEEDED,
	FETCH_ITEM_FAILED,
	URL_CURRENT_USER,
	CURRENT_CARD_CHANGED,
	SHOW_MAPPING_FIELD,
	SHOW_RECORD,
	CLOSE_RECORD_CLICKED,
	CLOSE_MAPPING_CLICKED,
	REFRESH_BUTTON_CLICKED,
} from "../constants";

export default {
	actionHandlers: {
		[actionTypes.COMPONENT_BOOTSTRAPPED]: ({ dispatch }) => {
			dispatch(INTEGRATION_MESSAGE_LOAD_REQUESTED);
		},
		[INTEGRATION_MESSAGE_LOAD_REQUESTED]: createHttpEffect(URL_CURRENT_USER, {
			startActionType: INTEGRATION_MESSAGE_LOAD_STARTED,
			successActionType: INTEGRATION_MESSAGE_LOAD_SUCCEEDED,
			errorActionType: INTEGRATION_MESSAGE_LOAD_FAILED,
		}),
		[INTEGRATION_MESSAGE_LOAD_STARTED]: ({ updateState }) => {
			updateState({ isLoading: true });
		},
		[INTEGRATION_MESSAGE_LOAD_SUCCEEDED]: ({
			action: {
				payload: { result = {} },
			},
			dispatch,
			updateState,
		}) => {
			const { user_sys_id: userSysId } = result;
			if (userSysId) {
				updateState({ userSysId });
				dispatch(FETCH_ITEM_REQUESTED, {
					sysparm_query: "ORDERBYDESCsys_created_on",
					sysparm_limit: 10,
				});
			} else {
				updateState({ isLoading: false });
			}
		},
		[FETCH_ITEM_REQUESTED]: createHttpEffect(URL_TABLE_INTEGRATION_MESSAGE, {
			queryParams: ["sysparm_query", "sysparm_limit"],
			errorActionType: FETCH_ITEM_FAILED,
			successActionType: FETCH_ITEM_SUCCEEDED,
		}),
		[FETCH_ITEM_SUCCEEDED]: ({ action, updateState }) => {
			const {
				payload: { result = [] },
			} = action;
			updateState({ isLoading: false });
			updateState({
				path: "items",
				operation: "concat",
				value: result,
			});
		},
		[CURRENT_CARD_CHANGED]: ({ action, updateState, state }) => {
			const { payload } = action;
			const { items } = state;
			updateState({
				currentIndex: payload.currentIndex,
			});
			updateState({
				path: "partner",
				value: payload.partner,
				operation: "set",
			});
			updateState({
				path: "record",
				value: payload.record,
				operation: "set",
			});
			updateState({
				path: "message_mapping",
				value: items[payload.currentIndex].message_mapping,
				operation: "set",
			});
		},
		[SHOW_RECORD]: ({ updateState }) => {
			updateState({
				showRecord: true,
			});
		},
		[SHOW_MAPPING_FIELD]: ({ updateState }) => {
			updateState({
				showMappingField: true,
			});
		},
		[CLOSE_RECORD_CLICKED]: ({ updateState }) => {
			updateState({
				showRecord: false,
			});
		},
		[CLOSE_MAPPING_CLICKED]: ({ updateState }) => {
			updateState({
				showMappingField: false,
			});
		},
		[REFRESH_BUTTON_CLICKED]: ({ dispatch, updateState, state }) => {
			const { items } = state;
			updateState({
				isLoading: true,
				currentIndex: -1,
				showRecord: false,
				showMappingField: false,
			});
			if (items.length > 0) {
				updateState({
					path: "items",
					value: {},
					operation: "splice",
					start: 0,
					deleteCount: items.length,
				});
			}
			dispatch(INTEGRATION_MESSAGE_LOAD_REQUESTED);
		},
	},
};
