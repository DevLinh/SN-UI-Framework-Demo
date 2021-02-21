import "@servicenow/now-toggle";
import "@servicenow/now-label-value";
import "@servicenow/now-card";
import "@servicenow/now-icon";
import { NO_DATA, CLOSE_MAPPING } from "./constants";
export default (state) => {
	const { mapping_fields } = state;

	return mapping_fields.length > 0 ? (
		<now-card className="cardItem" size="lg" interaction="none">
			<now-card-header
				heading={{
					label: "Message Mapping Fields",
					size: "md",
					lines: 1,
				}}
				caption={{
					label: "We make it work.",
					lines: 2,
				}}
				actions={[
					{
						id: "closeMapping",
						icon: "close-outline",
						label: "Close",
						clickActionType: CLOSE_MAPPING,
					},
				]}
			></now-card-header>
			{mapping_fields.map((item, index) => (
				<div className="row">
					<div>
						<now-label-value-inline
							className="text"
							key={index + "in"}
							label={item.internal_field_name}
							value=""
						></now-label-value-inline>
						<now-icon icon="circle-chevron-right-outline" />
						<now-label-value-inline
							className="text"
							key={index + "ex"}
							label={item.external_field_name}
							value=""
						></now-label-value-inline>
						{item.default_value !== "" ? (
							<now-highlighted-value
								label={item.default_value}
								color="gray"
								variant="tertiary"
								icon=""
							></now-highlighted-value>
						) : null}
					</div>
					<now-highlighted-value
						label={item.active === "true" ? "active" : "unactive"}
						color={item.active === "true" ? "positive" : "critical"}
						show-icon
					></now-highlighted-value>
				</div>
			))}
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
					label: "No Record data available",
					lines: 2,
				}}
				actions={[
					{ id: "closeMapping", icon: "close-outline", label: "Close" },
				]}
			></now-card-header>
		</now-card>
	);
};
