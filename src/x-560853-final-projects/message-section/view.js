import "@servicenow/now-toggle";
import "@servicenow/now-label-value";
import "@servicenow/now-card";
import {
	NOW_CARD_ACTION_MAPPING_FIELD,
	NOW_CARD_ACTION_RECORD_DETAIL,
} from "../constants";
export default (state) => {
	const {
		properties: { detail },
	} = state;

	return (
		<now-card
			className="cardItem"
			size="lg"
			interaction="none"
			sidebar={{
				color:
					detail.message_status === "processed" ||
					detail.message_status === "inserted" ||
					detail.message_status === "deleted"
						? "positive"
						: "critical",
				variant: "primary",
			}}
		>
			<now-card-header
				// tagline={{ label: detail.number, icon: "document-outline", size: "lg" }}
				heading={{
					label: "Message " + detail.number,
					icon: "document-outline",
					size: "md",
					lines: 2,
				}}
				// // caption={{ label: "Caption with more info", lines: 2 }}
			></now-card-header>
			<now-label-value-tabbed
				size="md"
				delimiter=","
				items={[
					{
						label: "Table",
						value: {
							type: "highlighted-value",
							label: detail.table,
							status: "info",
						},
					},
					{
						label: "Opened by",
						value: {
							type: "html",
							value: detail.sys_created_by,
						},
					},
					{
						label: "Http Status",
						value: {
							type: "html",
							value: detail.http_status,
						},
					},
					{
						label: "Integration Type",
						value: {
							type: "html",
							value: detail.integration_type,
						},
					},
					{
						label: "External Number",
						value: {
							type: "html",
							value: detail.external_number,
						},
					},
				]}
			/>
			<now-label-value-inline label="Request body" size="lg" />
			<textarea
				className="jsonView"
				name="requestJson"
				id="requestJson"
				cols="30"
				rows="10"
				value={JSON.stringify(JSON.parse(detail.request_body), undefined, 4)}
			></textarea>

			<now-label-value-inline label="Response body" size="lg" />
			<textarea
				className="jsonView"
				name="responseJson"
				id="responseJson"
				cols="30"
				rows="10"
				value={JSON.stringify(JSON.parse(detail.response_body), undefined, 4)}
			></textarea>
			<now-card-actions
				className="action"
				items={[
					{
						label: "Record Detail",
						icon: "document-outline",
						variant: "secondary-positive",
						clickActionType: NOW_CARD_ACTION_RECORD_DETAIL,
					},
					{
						label: "Message Mapping Fields",
						icon: "list-show-outline",
						clickActionType: NOW_CARD_ACTION_MAPPING_FIELD,
					},
				]}
			></now-card-actions>
			<card-footer className="footer">
				<now-highlighted-value
					slot="start"
					label={detail.message_status}
					show-icon
					status={
						detail.message_status === "processed" ||
						detail.message_status === "inserted" ||
						detail.message_status === "deleted" ||
						detail.message_status === "updated"
							? "positive"
							: "critical"
					}
				/>
				<now-label-value-inline
					size="lg"
					label="Created on"
					value={detail.sys_created_on}
				/>
			</card-footer>
		</now-card>
	);
};
