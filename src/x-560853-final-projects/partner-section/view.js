import "@servicenow/now-toggle";
import "@servicenow/now-label-value";
import "@servicenow/now-card";
import { NO_DATA } from "../constants";
export default (state) => {
	const {
		properties: { partner },
	} = state;

	return (
		<now-card
			className="cardItem"
			size="lg"
			interaction="none"
			sidebar={{
				color: partner.active === "true" ? "positive" : "critical",
				variant: "primary",
			}}
		>
			{partner.partner_name ? (
				<div>
					<now-card-header
						heading={{
							label: "PARTNER " + partner.partner_name,
							size: "md",
							lines: 1,
						}}
						caption={{ label: partner.description, lines: 2 }}
						actions={[
							{
								id: partner.name + "card",
								icon: "tags-outlined",
								label: "More detail",
								size: "lg",
							},
						]}
					></now-card-header>
					<card-footer className="footer">
						<now-highlighted-value
							slot="start"
							label={partner.active == "true" ? "active" : "unactive"}
							show-icon
							status={partner.active === "true" ? "positive" : "critical"}
						/>
						<now-label-value-inline
							size="lg"
							label="Created on"
							value={partner.sys_created_on}
						/>
					</card-footer>
				</div>
			) : (
				<now-card-header
					heading={{ label: NO_DATA, size: "md", lines: 2 }}
					caption={{ label: "Some errors can lead this problem.", lines: 2 }}
				></now-card-header>
			)}
		</now-card>
	);
};
