import { Button, Dropdown, MenuProps, Typography } from "antd";
import { PlanningData } from "./planning";

// This is the column definition for the partner column
// This column is used in two different cases
// 1. We can choose a partner from a list of partners, and this partner will fill in his vehicle and driver
//    If the partner has only one vehicle and/or driver, this vehicle and/or driver will be automatically selected
// 2. We can choose ourselves as a partner, and we will fill in our vehicle and driver

const { Title } = Typography;

const PARTNER_INTERNAL_ID = 1;
const PARTNER_UNSET_ID = 0;

/**
 * Function that renders the chauffeur element in the table, if the chauffeur is set
 * @param props 
 * @returns 
 */
function Chauffeur(props: { element: PlanningData, index: number }) {

	if (props.element.driverId != 0) {
		return (
			<b>				
				<Typography style={{ textAlign: "center", color: "rgba(0 0 0 0.8)" }}>
					{props.element.driver?.first_name}
					{" "}
					{props.element.driver?.last_name.toUpperCase()}
				</Typography>
			</b>
		)
	}

	return <></>;
}

/**
 * Function that renders the "missing chauffeur" element in the table, if the chauffeur is not set, and the partner is ourselves
 * @param props 
 * @returns 
 */
function Chauffeur_Missing_Internal(props: { element: PlanningData, index: number }) {
	return <Button type="dashed" size="small" onClick={() => { }}>Attribuer un chauffeur</Button>
}

/**
 * Renders the partner element in the table
 * @param props 
 * @returns 
 */
function Partner(props: { element: PlanningData, index: number }) {

	let partner_name = props.element.partner.name;
	if (props.element.partnerId == 1) partner_name = "CHABE"; // DEBUG

	const items: MenuProps['items'] = [
		{
			key: '0',
			label: (
				<>
					<Title level={5} style={{ textAlign: "center", color: "rgba(0 0 0 0.8)" }}>
						{partner_name.toUpperCase()}
					</Title>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<a href="tel:0000">
							<Typography style={{ textAlign: "center", color: "rgba(0 0 0 0.8)" }}>
								06 00 00 00 00
							</Typography>
						</a>
						<a href="mailto:aa@test.fr">
							<Typography style={{ textAlign: "center", color: "rgba(0 0 0 0.8)" }}>
								test@{props.element.partner.name}.com
							</Typography>
						</a>
					</div>
				</>
			),
		},
		{
			key: '1',
			label: (
				<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
					Filtrer : Afficher uniquement les missions XX
				</a>
			),
		},
		{
			key: '2',
			label: (
				<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
					Ouvrir les informations de ce partenaire
				</a>
			),
		},
	];


	let driver;
	if (props.element.driverId != PARTNER_UNSET_ID) {
		// If the driver is set, we render the driver element
		driver = <Chauffeur element={props.element} index={props.index} />
	}
	else {
		// The driver is not set, we render different content based on the partner (us = missing chauffeur, other = waiting chauffeur)
		if (props.element.partnerId == PARTNER_INTERNAL_ID)
			driver = <Chauffeur_Missing_Internal element={props.element} index={props.index} />
		else
			driver = <i style={{color: "orange"}}>En attente chauffeur</i>
	}

	return (
		<>
			<Dropdown
				trigger={['contextMenu']}
				menu={{ items }}
			>
				<Typography style={{ textAlign: "center", color: "rgba(0 0 0 0.8)" }}>{partner_name}</Typography>
			</Dropdown>
			{driver}
		</>
	)
}

function Partner_Unset(props: { element: PlanningData, index: number }) {
	return <Button type="dashed" size="small" onClick={() => { }}>Attribuer un partenaire</Button>
}

export function partner_render(node: React.ReactNode, element: PlanningData, index: number) {

	const is_set = element.partnerId != PARTNER_UNSET_ID;

	return (<>

		<div style={{
			position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-around",
			alignItems: "center",
			textAlign: "center",
		}}>

			{is_set ? <Partner element={element} index={index} />
				: <Partner_Unset element={element} index={index} />}

		</div>

	</>)

}
