import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./incident-record-section.scss";
import view from "./view";
import actions from "./actions";
createCustomElement("incident-record-section", {
	renderer: { type: snabbdom },
	view,
	initialState: {
		assign_to: "",
		assignment_group: "",
		caller: "",
		attachments: [],
	},
	properties: {
		record: {
			default: {},
		},
	},
	styles,
	...actions,
});
