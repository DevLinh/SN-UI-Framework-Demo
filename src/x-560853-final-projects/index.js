import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import "./integration-message-section";

const view = () => {
	return (
		<div className="main">
			<integration-message-section />
		</div>
	);
};

createCustomElement("x-560853-final-projects", {
	renderer: { type: snabbdom },
	view,
	styles,
});
