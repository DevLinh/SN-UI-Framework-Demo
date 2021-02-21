import "@servicenow/now-toggle";
import "@servicenow/now-label-value";
import "@servicenow/now-card";
import { NO_DATA } from "./constants";
export default (state) => {
	const {
		properties: { data, itemIndex },
		internalResult,
		partnerResult,
		messageMappingResult,
	} = state;

	return (
		<now-card
			interaction="click"
			className="cardItem"
			size="lg"
			sidebar={{
				color:
					data.message_status === "processed" ||
					data.message_status === "inserted" ||
					data.message_status === "deleted"
						? "positive"
						: "critical",
				variant: "primary",
			}}
		>
			<now-card-header
				// tagline={{ label: data.number, icon: "document-outline", size: "lg" }}
				heading={{ label: data.number, size: "md", lines: 2 }}
				// // caption={{ label: "Caption with more info", lines: 2 }}
				actions={[
					{
						id: data.number + "card",
						icon: "arrow-up-right-fill",
						label: "More detail",
						size: "lg",
					},
				]}
			></now-card-header>
			<now-label-value-tabbed
				size="md"
				delimiter=","
				items={[
					{
						label: "Partner",
						value: {
							type: "string",
							value: partnerResult.partner_name
								? partnerResult.partner_name
								: NO_DATA,
						},
					},
					{
						label: "Incident",
						value: {
							type: "text-link",
							label: !internalResult.number ? NO_DATA : internalResult.number,
							href: "#",
							underlined: true,
						},
					},
					{
						label: "Mapping Field",
						value: {
							type: "text-link",
							label: messageMappingResult.number
								? messageMappingResult.number
								: NO_DATA,
							href: "#",
							underlined: true,
						},
					},
					{
						label: "Opened by",
						value: {
							type: "html",
							value: data.sys_created_by,
						},
					},
				]}
			/>
			<card-footer className="footer">
				<now-highlighted-value
					slot="start"
					label={data.message_status}
					show-icon
					status={
						data.message_status === "processed" ||
						data.message_status === "inserted" ||
						data.message_status === "deleted" ||
						data.message_status === "updated"
							? "positive"
							: "critical"
					}
				/>
				<now-label-value-inline
					size="lg"
					label="Created on"
					value={data.sys_created_on}
				/>
			</card-footer>
		</now-card>
	);
};
