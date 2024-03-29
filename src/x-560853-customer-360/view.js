import { Fragment } from "@servicenow/ui-renderer-snabbdom";
import { OPEN_USER_DETAILS } from "./constants";
import getCallerData from "./getCallerData";
import "@servicenow/now-heading";
import "@servicenow/now-label-value";
import "@servicenow/now-loader";
import "@servicenow/now-icon";

const customerDetails = (
	userResult,
	locationResult,
	companyResult,
	dispatch
) => {
	const dataFromat = getCallerData(userResult, locationResult, companyResult);

	if (!Object.keys(userResult).length) {
		return (
			<div className="no-data">
				<now-icon icon="circle-info-outline" size="xl"></now-icon>
				<now-label-value-inline lable="No data available" />
			</div>
		);
	}

	return (
		<Fragment>
			<header>
				<now-heading label="Caller" variant="title-primary" />
			</header>
			<section className="customer-details">
				<span
					className="caller-avatar"
					on-click={() => {
						dispatch(OPEN_USER_DETAILS);
					}}
				>
					<now-avatar
						size="lg"
						user-name={dataFromat.name}
						imageSrc={
							dataFromat.photo ? "/" + dataFromat.photo + ".iix?t=small" : ""
						}
					/>
				</span>
				<now-heading
					label={dataFromat.name}
					variant="title-secondary"
					on-click={() => {
						dispatch(OPEN_USER_DETAILS);
					}}
				/>
				<now-label-value-stacked
					align="horizontal-equal"
					delimiter=","
					items={dataFromat.itemOne}
					size="md"
					truncated
				/>
				<now-label-value-stacked
					align="horizontal-equal"
					delimiter=","
					items={dataFromat.itemTwo}
					size="md"
					truncated
				/>
			</section>
		</Fragment>
	);
};

export default (state, { dispatch }) => {
	const { userResult, isLoading, locationResult, companyResult } = state;

	return (
		<section className="customer-360">
			{isLoading ? (
				<now-loader label="Loading..." size="lg"></now-loader>
			) : (
				customerDetails(userResult, locationResult, companyResult, dispatch)
			)}
		</section>
	);
};
