import { actionTypes } from "@servicenow/ui-core";
import { getHttpEffect } from "./getHttpEffect";
import {
	INTERNAL_FETCH_REQUESTED,
	INTERNAL_FETCH_SUCCEEDED,
	INTERNAL_FETCH_FAILED,
	PARTNER_FETCH_REQUESTED,
	PARTNER_FETCH_SUCCEEDED,
	PARTNER_FETCH_FAILED,
	MESSAGE_MAPPING_FETCH_REQUESTED,
	MESSAGE_MAPPING_FETCH_SUCCEEDED,
	MESSAGE_MAPPING_FETCH_FAILED,
	NO_DATA,
	BUTTON_HEADER_CLICKED,
	CARD_CLICKED,
} from "./constants";

import { CURRENT_CARD_CHANGED } from "../constants";

export default {
	actionHandlers: {
		[actionTypes.COMPONENT_BOOTSTRAPPED]: ({
			dispatch,
			updateState,
			properties,
		}) => {
			const { data } = properties;
			//we have to fetch 3 table for minimum due to the reference:
			//the table of the interal_number
			if (data.table && data.internal_number) {
				dispatch(INTERNAL_FETCH_REQUESTED, {
					table: data.table,
					sysId: data.internal_number.value,
				});
			} else {
				// set Interal to NO DATA
			}
			//the parter
			if (data.partner) {
				//link: "https://dev48287.service-now.com/api/now/table/x_554832_integrati_partner/f754a1d82f95e0102aa2a55df699b6e2"
				var partnerTable = data.partner.link.split("table/")[1].split("/")[0];
				dispatch(PARTNER_FETCH_REQUESTED, {
					table: partnerTable,
					sysId: data.partner.value,
				});
			}
			//the message mapping - this table is a special one, we need retrive the message field mapping also
			//for simple now we only retrive message mapping and the remainder then
			if (data.message_mapping) {
				var messMappingTable = data.message_mapping.link
					.split("table/")[1]
					.split("/")[0];
				dispatch(MESSAGE_MAPPING_FETCH_REQUESTED, {
					table: messMappingTable,
					sysId: data.message_mapping.value,
				});
			}
		},
		[INTERNAL_FETCH_REQUESTED]: getHttpEffect({
			successActionType: INTERNAL_FETCH_SUCCEEDED,
			errorActionType: INTERNAL_FETCH_FAILED,
		}),
		[INTERNAL_FETCH_SUCCEEDED]: ({ action, updateState }) => {
			const {
				payload: { result },
			} = action;
			if (result && result.number) {
				updateState({ internalResult: result });
			}
		},
		[INTERNAL_FETCH_FAILED]: ({ updateState }) => {
			updateState({ internalResult: NO_DATA });
		},
		//for the partner
		[PARTNER_FETCH_REQUESTED]: getHttpEffect({
			successActionType: PARTNER_FETCH_SUCCEEDED,
			errorActionType: PARTNER_FETCH_FAILED,
		}),
		[PARTNER_FETCH_SUCCEEDED]: ({ action, updateState }) => {
			const {
				payload: { result },
			} = action;
			if (result && result.number) {
				updateState({ partnerResult: result });
			}
		},
		[PARTNER_FETCH_FAILED]: ({ updateState }) => {
			updateState({ partnerResult: NO_DATA });
		},
		//for the message mapping
		[MESSAGE_MAPPING_FETCH_REQUESTED]: getHttpEffect({
			successActionType: MESSAGE_MAPPING_FETCH_SUCCEEDED,
			errorActionType: MESSAGE_MAPPING_FETCH_FAILED,
		}),
		[MESSAGE_MAPPING_FETCH_SUCCEEDED]: ({ action, updateState }) => {
			const {
				payload: { result },
			} = action;
			if (result && result.number) {
				updateState({ messageMappingResult: result });
			}
		},
		[PARTNER_FETCH_FAILED]: ({ updateState }) => {
			updateState({ messageMappingResult: NO_DATA });
		},
		[BUTTON_HEADER_CLICKED]: ({ properties, dispatch, state }) => {
			const { itemIndex } = properties;
			const { partnerResult, internalResult } = state;
			dispatch(CURRENT_CARD_CHANGED, {
				currentIndex: itemIndex,
				partner: partnerResult,
				record: internalResult,
			});
		},
		[CARD_CLICKED]: ({ properties, dispatch, state }) => {
			const { itemIndex } = properties;
			const { partnerResult, internalResult } = state;
			dispatch(CURRENT_CARD_CHANGED, {
				currentIndex: itemIndex,
				partner: partnerResult,
				record: internalResult,
			});
		},
	},
};
