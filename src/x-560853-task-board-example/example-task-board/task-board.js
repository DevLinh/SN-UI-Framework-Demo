import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./task-board.scss";
import view from "./view";
import taskBoardActions from "./actions";
import { LANES, CARDS } from "../constants";

createCustomElement("x-560853-example-task-board", {
	renderer: { type: snabbdom },
	view,
	initialState: {
		lanes: LANES,
		cards: CARDS,
	},
	styles,
	...taskBoardActions,
});
