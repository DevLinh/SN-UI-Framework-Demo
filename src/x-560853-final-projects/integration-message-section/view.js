import "../integration-message-item";
import "@servicenow/now-loader";
import "@servicenow/now-label-value";
import "@servicenow/now-button";
import "../partner-section";
import "../message-section";
import "../incident-record-section";
import "../mapping-field-section";
export default (state) => {
	const {
		items,
		isLoading,
		currentIndex,
		partner,
		showRecord,
		record,
		showMappingField,
		message_mapping,
	} = state;

	return (
		<div className="container">
			<div className="now-list" role="rowgroup">
				{isLoading ? (
					<now-loader label="loading..." size="lg" />
				) : (
					items.map((item, index) => (
						<integration-message-item data={item} itemIndex={index} />
					))
				)}
				{!items.length && !isLoading ? (
					<now-label-value-inline label="No items to display" />
				) : null}
			</div>
			<div className="detail">
				{currentIndex >= 0 ? (
					<div>
						<partner-section
							// partner={{
							// 	name: "dev56237",
							// 	active: "true",
							// 	sys_created_on: "22/12/2020",
							// }}
							partner={partner}
						/>
						<message-section detail={items[currentIndex]} />
					</div>
				) : (
					<div className="cover">
						{isLoading ? (
							<now-loader label="loading..." size="lg" />
						) : (
							<div>
								<img src="https://cdn.worldvectorlogo.com/logos/servicenow-1.svg" />
								<h3>.Click for more detail.</h3>
							</div>
						)}
					</div>
				)}
			</div>
			<div className="moreDetail">
				{showRecord === true && record !== {} ? (
					<incident-record-section record={record} />
				) : null}
				{showMappingField === true && message_mapping !== {} ? (
					<mapping-field-section mapping={message_mapping} />
				) : null}
			</div>
			<div className="refresh">
				<now-button-iconic
					icon="arrow-clockwise-outline"
					bare={true}
					variant="tertiary"
					size="lg"
					tooltipContent="Refresh"
					highContrast={true}
				></now-button-iconic>
			</div>
		</div>
	);
};
