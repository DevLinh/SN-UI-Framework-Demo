import "@servicenow/now-toggle";
import "@servicenow/now-label-value";
import "@servicenow/now-card";
import "@servicenow/now-template-card";
import { NO_DATA, CLOSE_RECORD } from "./constants";
export default (state) => {
	const {
		properties: { record },
		caller,
		assign_to,
		assignment_group,
		attachments,
	} = state;

	return record !== {} ? (
		<now-card className="cardItem" size="lg" interaction="none">
			<now-card-header
				heading={{
					label: record.number,
					size: "md",
					lines: 1,
				}}
				caption={{
					label: record.u_cir
						? "CIR :" + record.u_cir
						: "No CIR data available",
					lines: 2,
				}}
				actions={[
					{
						id: "closeRecord",
						icon: "close-outline",
						label: "Close",
						clickActionType: CLOSE_RECORD,
					},
				]}
			></now-card-header>
			<div className="attachments">
				{attachments.length > 0
					? attachments.map((item, index) => (
							<now-template-card-attachment
								key={index + "attachment"}
								identifier={{ type: "icon", icon: "paperclip-outline" }}
								heading={{ label: item.file_name.toLowerCase(), level: 2 }}
								caption={(parseInt(item.size_bytes) / 1000).toString() + "KB"}
								// actions={[{ id: "download", label: "Download" }]}
								actions={[
									{ id: "share", label: "Copy URL" },
									{ id: "close", label: "Mark Complete" },
								]}
							></now-template-card-attachment>
					  ))
					: null}
			</div>
			<now-label-value-tabbed
				size="md"
				delimiter=","
				items={[
					{
						label: "Caller",
						value: {
							type: "string",
							value: caller !== "" ? caller : NO_DATA,
						},
					},
					{
						label: "Assignment Group",
						value: {
							type: "string",
							value: assignment_group !== "" ? assignment_group : NO_DATA,
						},
					},
					{
						label: "Assign To",
						value: {
							type: "string",
							value: assign_to !== "" ? assign_to : NO_DATA,
						},
					},
					{
						label: "Short Description",
						value: {
							type: "html",
							value: record.short_description
								? record.short_description
								: NO_DATA,
						},
					},
				]}
			/>
			<card-footer className="footer">
				<now-label-value-inline
					size="lg"
					label="Created on"
					value={record.sys_created_on}
				/>
			</card-footer>
		</now-card>
	) : (
		<now-card className="cardItem" size="lg" interaction="none">
			<now-card-header
				heading={{
					label: NO_DATA,
					size: "lg",
					lines: 1,
				}}
				caption={{
					label: record.u_cir
						? "CIR :" + record.u_cir
						: "No Record data available",
					lines: 2,
				}}
				actions={[{ id: "closeRecord", icon: "close-outline", label: "Close" }]}
			></now-card-header>
		</now-card>
	);
};
