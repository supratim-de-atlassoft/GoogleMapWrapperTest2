import * as React from 'react';
import styles from './GoogleMapWrapperTest2.module.scss';
import { IGoogleMapWrapperTest2Props } from './IGoogleMapWrapperTest2Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MyMapComponent } from './MyMapComponent';
import NewMapComponent from './NewMapComponent';
import { MyMarker } from './MyMarker';
import { MapCluster } from './MapCluster';
import { SPService } from '../SPService';
import 'bootstrap/dist/css/bootstrap.css';
//import { Button, Col, Container, Row } from 'react-bootstrap';


const render = (status: Status) => {
	return <h1>{status}</h1>;
};

// export default class GoogleMapWrapperTest2 extends React.Component<IGoogleMapWrapperTest2Props, {}> {
export const GoogleMapWrapperTest2: React.VFC<IGoogleMapWrapperTest2Props> = (props) => {
	// let SPService: any = null;
	const spService = new SPService(props.context);
	const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
	const [zoom, setZoom] = React.useState(3); // initial zoom
	const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
		lat: 0,
		lng: 0,
	});
	const [mapDataFromList, setMapDataFromList] = React.useState<any>();

	// SPService = new SPService(props.context);
	React.useEffect(() => {
		async function anyNameFunction() {
			console.log("any mane")
			let response = await spService.getListItem("1234")
			console.log(response)
			console.log("any game")
			await setMapDataFromList(response)
			console.log(mapDataFromList)
			// return response	
		};

		// Execute the created function directly
		anyNameFunction();
	}, [])

	

	const onClick = (e: google.maps.MapMouseEvent) => {
		// avoid directly mutating state
		setClicks([...clicks, e.latLng!]);
	};

	const onIdle = (m: google.maps.Map) => {
		console.log("onIdle");
		setZoom(m.getZoom()!);
		setCenter(m.getCenter()!.toJSON());
	};

	const form = (
		<div
			style={{
				padding: "1rem",
				flexBasis: "250px",
				height: "100%",
				overflow: "auto",
			}}
		>
			<label htmlFor="zoom">Zoom</label>
			<input
				type="number"
				id="zoom"
				name="zoom"
				value={zoom}
				onChange={(event) => setZoom(Number(event.target.value))}
			/>
			<br />
			<label htmlFor="lat">Latitude</label>
			<input
				type="number"
				id="lat"
				name="lat"
				value={center.lat}
				onChange={(event) =>
					setCenter({ ...center, lat: Number(event.target.value) })
				}
			/>
			<br />
			<label htmlFor="lng">Longitude</label>
			<input
				type="number"
				id="lng"
				name="lng"
				value={center.lng}
				onChange={(event) =>
					setCenter({ ...center, lng: Number(event.target.value) })
				}
			/>
			<h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
			{clicks.map((latLng, i) => (
				<pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
			))}
			<button onClick={() => setClicks([])}>Clear</button>
		</div>
	);


	const mapDetails = (
		<div
			style={{
				padding: "1rem",
				flexBasis: "250px",
				height: "100%",
				overflow: "auto",
			}}
		>
			<h1 id="locatName">Suntory Hakushu Distillery</h1>
			<div id="editButton"><a href="/Pages/Location-Admin.aspx?weburl=/CONNECT/rackhouse/distillerytours&amp;locationid=03182017055609">Edit</a><br></br></div>
			<h2 id="locatLocation">Hokuto, Japan</h2>
			<div style={{ display: "block", width: "70px", height: "50px" }}>Carousel Here...</div>
			<p id="locatDesc"><div className="ExternalClass716C9BE4E3E640D981B9B9344E6A4104">The Hakushu Distillery taps into the rich natural bounty of the surrounding forests to craft premium whisky. Discover the passion and commitment to excellence behind the launching of the Hakushu brand through special videos, distillery tours, and tastings.<div className="ExternalClassB15DF5B5040A4DDF9726A87ADD0DF347">
			</div></div></p>

			<div id="locatAction">
				<h3 id="linksHeader">Tour the Distillery</h3>
				<div className="btn-container" id="linksContainer"></div>
				<div className="btn-container" id="privateLinksContainer"><a className="btn btn-primary action-link" target="_blank" href="https://whisky.suntory.com/en/global/distilleries/hakushu">In Person</a></div>
			</div>

			<div id="locatDocs">
				<h3 id="assetsHeader">Documents</h3>

			</div>


		</div>
	)

	return (

		<div style={{ display: "flex", height: "100%" }}>
			<p>{mapDataFromList && mapDataFromList.length > 0 ? mapDataFromList[0].Location : "I am not setting"}</p>
			<div id="map" style={{ height: '500px', width: '70%' }}></div>
			<Wrapper apiKey={"AIzaSyD0wAUgW8Zz3bPSY0ZvsrYxTpa5Gg8-b6Q"} render={render}>
				{/* <div id="map"></div> */}
				{mapDataFromList ? <MapCluster mapData = {mapDataFromList}></MapCluster> : null}
				
			</Wrapper>


			{/* Basic form for controlling center and zoom of map. */}
			{/* {form} */}
			{mapDetails}

			{/* <NewMapComponent
        center={center}
        onClick={onClick}
        onIdle={onIdle}
        zoom={zoom}
        style={{ flexGrow: "1", height: "100%" }}
        >
        {clicks.map((latLng, i) => (
          <MyMarker key={i} position={latLng} />
        ))}
         </NewMapComponent> */}

		</div>

	);
}
