import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapContainer = () => {

    const [selected, setSelected] = useState({});
    const [currentPosition, setCurrentPosition] = useState({});

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    })

    const onSelect = item => {
        setSelected(item);
    }

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
    }

    const locations = [
        {
            name: "Location 1",
            location: {
                lat: 41.3954,
                lng: 2.162
            },
        },
        {
            name: "Location 2",
            location: {
                lat: 41.3917,
                lng: 2.1649
            },
        },
        {
            name: "Location 3",
            location: {
                lat: 41.3773,
                lng: 2.1585
            },
        },
        {
            name: "Location 4",
            location: {
                lat: 41.3797,
                lng: 2.1682
            },
        },
        {
            name: "Location 5",
            location: {
                lat: 41.4055,
                lng: 2.1915
            },
        }
    ];

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyCG_0sqj3Ya1qXT8T08wn5DgC9v1XPFBRg'>

            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={currentPosition}
            >
              
                {
                    locations.map(item => {
                        return (
                            <Marker key={item.name} position={item.location} />
                        )
                    })
                }
                {
                    selected.location &&
                    (
                        <InfoWindow
                            position={selected.location}
                            clickable={true}
                            onCloseClick={() => setSelected({})}
                        >
                            <p>{selected.name}</p>
                        </InfoWindow>
                    )
                }
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;