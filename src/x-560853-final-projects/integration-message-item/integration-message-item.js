import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./integration-message-item.scss";
import view from "./view";
import IMActions from "./actions";
createCustomElement("integration-message-item", {
	renderer: { type: snabbdom },
	view,
	initialState: {
		internalResult: {},
		partnerResult: {},
		messageMappingResult: {},
	},
	properties: {
		itemIndex: {
			default: -1,
		},
		data: {
			default: {},
		},
	},
	styles,
	...IMActions,
});
