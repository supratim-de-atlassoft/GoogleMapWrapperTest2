import { MarkerClusterer } from "@googlemaps/markerclusterer";
import * as React from "react";

const areEqual = (prevProps, nextProps) => true;


export const MapCluster: React.FC<any> = React.memo((props) => {

    const locations = props.mapData.map(e => ({
        lat: parseFloat(e.Latitude),
        lng: parseFloat(e.Longitude)
    }));
    // const [currentId, setCurrentId] = React.useState<any>();
    const [zoom, setZoom] = React.useState(10); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>(locations[0]);
    const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
            zoom: zoom,
            center: center,
        }
    );

    console.log(props.mapData)
 
    console.log(locations, locations[0])

    const infoWindow = new google.maps.InfoWindow({
        content: "Test",
        disableAutoPan: true,
    });

    // Create an array of alphabetical characters used to label the markers.
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Add some markers to the map.
    const markers = locations.map((position, i) => {
        const label = labels[i % labels.length];
        const marker = new google.maps.Marker({
            position,
            label,
        });
        const id = i;

        // markers can only be keyboard focusable when they have click listeners
        // open info window when marker is clicked
        marker.addListener("click", () => {
            console.log(map)
            console.log(id);
            console.log(marker.getPosition().lat());
            console.log(marker.getPosition().lng());
            console.log(map.getZoom());
            console.log(props.mapData)

            props.onMarkerClick(id)


            infoWindow.setContent(props.mapData[id].Title);
            infoWindow.open(map, marker);
        });

        return marker;
    });

    // Add a marker clusterer to manage the markers.
    new MarkerClusterer({ markers, map });

    return (
        <>
            <div id="map"></div>
        </>
    );
}, areEqual);

// let locations = [
//     { lat: 35.8264806, lng: 138.2981547 }
// ];
export { };
