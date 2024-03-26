import { useEffect, useRef, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api'
import { FetchData } from '../../../Api/UserApi'

function MapContainer({propertyId}) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY // Assuming you have set your API key in an environment variable
    })

    const [map, setMap] = useState(null)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [latitude, setLatitude] = useState([])
    const [longitude, setLongitude] = useState([])
    const originRef = useRef()
    const destinationRef = useRef()

    useEffect(()=>{
        const MapProperty = async () => {
            try {
                const data = await FetchData(propertyId)
                console.log(data,"dataa of properyyy");
                setLatitude(data.data.data.latitude)
                setLongitude(data.data.data.longitude)
            } catch (error) {
                console.log(error);
            }
        }
        MapProperty();
    },[propertyId])

    async function calculateRoute() {
        if (originRef.current.value === '' || destinationRef.current.value === '') {
            return
        }
        const directionsService = new window.google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: window.google.maps.TravelMode.DRIVING,
        })
        console.log(results,"resultts");
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }
console.log(latitude,"latitude");
console.log(longitude,"lomngotude");
    const defaultCenter = {
        lat: latitude,
        lng: longitude
      };
    return (
        <>
            <div className="flex relative flex-col items-center h-screen w-screen mt-10">
                <div className="absolute left-0 top-0 h-full w-[90%] ml-16">
                    {isLoaded && (
                        <GoogleMap
                            center={defaultCenter}
                            zoom={15}
                            mapContainerStyle={{ width: '98%', height: '100%', marginLeft: '2%' }}
                            options={{
                                zoomControl: false,
                                streetViewControl: false,
                                mapTypeControl: false,
                                fullscreenControl: false,
                            }}
                            onLoad={map => setMap(map)}
                        >
                            <Marker position={defaultCenter} />
                            {directionsResponse && (
                                <DirectionsRenderer directions={directionsResponse} />
                            )}
                        </GoogleMap>
                    )}
                </div>
            </div>
        </>
    )
}

export default MapContainer
