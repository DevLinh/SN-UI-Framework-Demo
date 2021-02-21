import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./mapping-field-section.scss";
import view from "./view";
import actions from "./actions";
createCustomElement("mapping-field-section", {
	renderer: { type: snabbdom },
	view,
	initialState: {
		mapping_fields: [],
	},
	properties: {
		mapping: {
			default: {},
		},
	},
	styles,
	...actions,
});
