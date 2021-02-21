import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import view from "./view";
import styles from "./partner-section.scss";
createCustomElement("partner-section", {
	renderer: { type: snabbdom },
	view,
	properties: {
		partner: {
			default: {
				name: "dev****",
				sys_created_on: "01/01/2020",
				active: "unactive",
			},
		},
	},
	styles,
});
