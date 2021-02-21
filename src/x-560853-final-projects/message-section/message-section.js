import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import view from "./view";
import styles from "./message-section.scss";
import actions from "./actions";
createCustomElement("message-section", {
	renderer: { type: snabbdom },
	view,
	properties: {
		detail: {},
	},
	styles,
	...actions,
});
