import {
	NOW_CARD_ACTION_MAPPING_FIELD,
	NOW_CARD_ACTION_RECORD_DETAIL,
	SHOW_RECORD,
	SHOW_MAPPING_FIELD,
} from "../constants";
export default {
	actionHandlers: {
		[NOW_CARD_ACTION_RECORD_DETAIL]: ({ dispatch }) => {
			dispatch(SHOW_RECORD);
		},
		[NOW_CARD_ACTION_MAPPING_FIELD]: ({ dispatch }) => {
			dispatch(SHOW_MAPPING_FIELD);
		},
	},
};
