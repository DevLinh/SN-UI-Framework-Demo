import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import view from "./view";
import styles from "./integration-message-section.scss";
import actions from "./actions";
createCustomElement("integration-message-section", {
	renderer: { type: snabbdom },
	view,
	initialState: {
		userSysId: "",
		items: [],
		isLoading: false,
		currentIndex: -1,
		partner: {},
		record: {},
		showRecord: false,
		showMappingField: false,
		message_mapping: {},
	},
	styles,
	...actions,
});
