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
import { Carousel, Col, Row, Table } from 'react-bootstrap';
import { FaHeart, FaWindows } from "react-icons/fa";
import { IoIosAdd, IoIosMail, IoMdDownload, IoIosStar } from "react-icons/io";
import { RichText } from '@pnp/spfx-controls-react/lib/RichText';



import { Icon } from '@fluentui/react/lib/Icon';
import { getFileTypeIconProps, FileIconType, initializeFileTypeIcons } from '@fluentui/react-file-type-icons';

initializeFileTypeIcons(undefined);

console.log("abcd");

const render = (status: Status) => {
	return <h1>{status}</h1>;
};

// export default class GoogleMapWrapperTest2 extends React.Component<IGoogleMapWrapperTest2Props, {}> {
export const GoogleMapWrapperTest2: React.VFC<IGoogleMapWrapperTest2Props> = (props) => {
	// let SPService: any = null;
	const spService = new SPService(props.context);
	// const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
	// const [zoom, setZoom] = React.useState(3); // initial zoom
	// const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
	// 	lat: 50,
	// 	lng: 50, 
	// });
	const [mapDataFromList, setMapDataFromList] = React.useState<any>();
	const [imageDataFromList, setImageDataFromList] = React.useState<any>();
	const [docDataFromLibrary, setDocDataFromLibrary] = React.useState<any>();
	const [linkDataFromList, setLinkDataFromList] = React.useState<any>();


	const [currentLocId, setCurrentLocId] = React.useState<any>();
	const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
		lat: 0,
		lng: 0,
	});

	var rackID = window.location.pathname.split("/").reverse()[0].split(".")[0];
	console.log(rackID)

	// SPService = new SPService(props.context);
	React.useEffect(() => {
		async function anyNameFunction() {
			// console.log("any mane")
			let response = await spService.getListItem(rackID)
			// console.log(currentLocId)
			// let images = currentLocId ? await spService.getImages(currentLocId) : undefined;
			// console.log(images[0].URL.Url);
			// console.log(images[1].URL.Url);
			// console.log(images[2].URL.Url);
			// console.log(response)
			// console.log("any game")
			await setMapDataFromList(response)
			// await setImageDataFromList(images)
			console.log(imageDataFromList)

			console.log(mapDataFromList)
			// return response	
		};

		// Execute the created function directly
		anyNameFunction();
	}, [])


	// var rackID = window.location.pathname.split("/").reverse()[0].split(".")[0];
	// console.log(rackID)

	// const onClick = (e: google.maps.MapMouseEvent) => {
	// 	// avoid directly mutating state
	// 	setClicks([...clicks, e.latLng!]);
	// };

	// const onIdle = (m: google.maps.Map) => {
	// 	console.log("onIdle");
	// 	setZoom(m.getZoom()!);
	// 	setCenter(m.getCenter()!.toJSON());
	// };

	// const form = (
	// 	<div
	// 		style={{
	// 			padding: "1rem",
	// 			flexBasis: "250px",
	// 			height: "100%",
	// 			overflow: "auto",
	// 		}}
	// 	>
	// 		<label htmlFor="zoom">Zoom</label>
	// 		<input
	// 			type="number"
	// 			id="zoom"
	// 			name="zoom"
	// 			value={zoom}
	// 			onChange={(event) => setZoom(Number(event.target.value))}
	// 		/>
	// 		<br />
	// 		<label htmlFor="lat">Latitude</label>
	// 		<input
	// 			type="number"
	// 			id="lat"
	// 			name="lat"
	// 			value={center.lat}
	// 			onChange={(event) =>
	// 				setCenter({ ...center, lat: Number(event.target.value) })
	// 			}
	// 		/>
	// 		<br />
	// 		<label htmlFor="lng">Longitude</label>
	// 		<input
	// 			type="number"
	// 			id="lng"
	// 			name="lng"
	// 			value={center.lng}
	// 			onChange={(event) =>
	// 				setCenter({ ...center, lng: Number(event.target.value) })
	// 			}
	// 		/>
	// 		<h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
	// 		{clicks.map((latLng, i) => (
	// 			<pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
	// 		))}
	// 		<button onClick={() => setClicks([])}>Clear</button>
	// 	</div>
	// );

	const addLocationBut = (
		<div className={styles.googleMapWrapperTest2} style={{ marginLeft: "3%" }}>
			<a className={styles.addLocationBut} href={`https://devbeam.sharepoint.com/sites/ModernConnect/SitePages/Location-Administration-Form.aspx?RID=${rackID}`} type="button" style={{ display: "inline" }}>

				<h2 style={{ fontSize: "20px" }}>
					<IoIosAdd size={"30px"} />Add Location
				</h2>
			</a>
		</div>
	)


	const mapCarousel = (
		imageDataFromList && imageDataFromList.length > 0 ?
			<Carousel style={{ height: "300px" }}>

				{imageDataFromList.map((itemDetail, i) => (
					<Carousel.Item>
						<img style={{ objectFit: "cover", height: "300px", width: "100%" }}
							className="d-block w-100"
							src={itemDetail.FileRef}
							alt="First slide"
						/>
						<Carousel.Caption>
							<h3>{itemDetail.Title}</h3>

						</Carousel.Caption>
					</Carousel.Item>
				))}
			</Carousel> :
			null
		// <div style={{display:"block",width:"100%"}}>		

		// </div>



	)

	const mapLinks = (
		linkDataFromList && linkDataFromList.length > 0 ?
			<div>

				{
					linkDataFromList.map((itemDetail, i) => (
						<div >
							<div className="btn-container" id="linksContainer"></div>
							<div className="btn-container" id="privateLinksContainer"><a className={styles.button} target="_blank" href={itemDetail.LinkURL}>{itemDetail.Title}</a></div>
						</div>
					))
				}
			</div>
			:
			null
	)

	const mapDocuments = (
		docDataFromLibrary && docDataFromLibrary.length > 0 ?
			<div className={styles.googleMapWrapperTest2}>
				{/* // <div style={{ height: "300px" }}> */}
				<Table>
					<thead>
						<th>Name</th>
						<th>Download</th>
						{/* <th>Favourite</th> */}
						<th>Mail</th>
					</thead>

					<tbody>

						{docDataFromLibrary.map((itemDetail, i) => (
							<tr>
								<td><a target="_blank" data-interception="off" rel="noopener noreferrer" href={itemDetail.ServerRedirectedEmbedUri != null && itemDetail.ServerRedirectedEmbedUri != "" ? itemDetail.ServerRedirectedEmbedUri : itemDetail.FileRef}>

									<Icon {...getFileTypeIconProps({
										extension: itemDetail.FileRef.split(".")[1],
										size: 20,
										imageFileType: 'svg'
									})} />
									{itemDetail.FileRef.substring(40)}
								</a></td>
								<td><a data-interception="off" href={"https://devbeam.sharepoint.com/sites/ModernConnect/_layouts/download.aspx?SourceUrl=" + itemDetail.FileRef} ><IoMdDownload size={"20px"} /></a></td>
								{/* <td><a href={"https://devbeam.sharepoint.com/sites/ModernConnect/_layouts/download.aspx?SourceUrl=" + itemDetail.FileRef} ><IoIosStar size={"20px"} /></a></td> */}
								<td><a className="share-link hidden-xs hidden-sm"
									href={`mailto:?subject=${itemDetail.FileRef}&ampbody=Open:%0D%0Ahttps://devbeam.sharepoint.com/sites/ModernConnect/Rackhouse%20Documents/1.%2520CONNECT%2520Tutorial%2520(5.3.2021).mp4"><i className="fa icon-envelope`}><IoIosMail size={"20px"} /></a></td>
							</tr>
						))}

					</tbody>
				</Table>
			</div> :
			null

	)

	const mapDetails = (
		currentLocId >= 0 ?
			<div className={styles.googleMapWrapperTest2}
				style={{
					padding: "1rem",
					flexBasis: "250px",
					height: "100%",
					overflow: "auto",
				}}
			>

				<h1 style={{ fontSize: "45px", color: "#CC0A0A" }}>{mapDataFromList[currentLocId].Title}</h1>

				<div id="editButton"><a href={`https://devbeam.sharepoint.com/sites/ModernConnect/SitePages/Location-Administration-Form.aspx?RID=${rackID}&LID=${mapDataFromList[currentLocId].ID}`}>Edit</a><br></br></div>

				<h2 className={styles.locatLocation}>{mapDataFromList[currentLocId].Location}</h2>
				<div>
					{/* Carousel Here */}
					{mapCarousel}

				</div>
				<p className={styles.locatDesc}><div className={styles.descText}>
										
					<RichText className={styles.descText} value={mapDataFromList[currentLocId].Description} isEditMode={false}/>
					{/* {mapDataFromList[currentLocId].Description} */}
					<div className="ExternalClassB15DF5B5040A4DDF9726A87ADD0DF347">
					</div></div></p>
				{linkDataFromList && linkDataFromList.length > 0 ?

					<div id="locatAction" style={{ marginBottom: "10px" }}>
						<h3 className={styles.linksHeader}>Tour The Distillery</h3>
						{mapLinks}
					</div>
					: null
				}
				{docDataFromLibrary && docDataFromLibrary.length > 0 ?

					<div id="locatDocs" >
						<h3 className={styles.linksHeader}>Documents</h3>
						{mapDocuments}
					</div>
					: null}


			</div> : <div className={styles.googleMapWrapperTest2}><p className={styles.pinText}>Select a pin on the map to view location details. </p></div>

	)
	// const getCurrentItem = (id) => {
	// 	console.log("I am the ID" + id)
	// }

	// const getCurrentItem = React.useCallback((id) => {
	// 	// do something with a, b and props.x
	// 	console.log(id)
	//   }, [props]);
	// getCurrentItem(id){
	// 	console.log()
	// }

	const onMarkerClick = async (index) => {
		console.log("I am id " + index);
		setCurrentLocId(index)
		console.log(mapDataFromList[index].Location)
		let images = await spService.getImages(mapDataFromList[index].ID);
		let documents = await spService.getDocuments(mapDataFromList[index].ID);
		let links = await spService.getLinks(mapDataFromList[index].ID);

		console.log(images)
		console.log(documents)
		console.log(links)
		await setImageDataFromList(images);
		await setDocDataFromLibrary(documents);
		await setLinkDataFromList(links);

		console.log(docDataFromLibrary)
		console.log(imageDataFromList)
		console.log(linkDataFromList)
	}



	return (

		<div>
			{addLocationBut}


			<div style={{ height: "100%" }}>

				{mapDataFromList ? console.log(mapDataFromList) : null}
				{/* <p>{mapDataFromList && mapDataFromList.length > 0 ? "hum hain" : "I am not setting"}</p> */}
				<Row>
					<Col lg={6}>
						<div id="map"
							style={{ height: '500px' }}
						></div>

						<Wrapper apiKey={"AIzaSyD0wAUgW8Zz3bPSY0ZvsrYxTpa5Gg8-b6Q"} render={render}>
							{/* <div id="map"></div> */}

							{mapDataFromList ? <MapCluster
								mapData={mapDataFromList}
								onMarkerClick={onMarkerClick}

							></MapCluster> : null}

						</Wrapper>
					</Col>


					{/* Basic form for controlling center and zoom of map. */}
					{/* {form} */}
					<Col lg={6}>
						{mapDetails}
					</Col>
				</Row>

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

		</div>



	);
}
