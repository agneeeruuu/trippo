import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '../../node_modules/@react-google-maps/api/dist/index'
import Axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import { USER_ADDRESS_MAP_CONFIRM } from '../constants/userConstants';

const libs = ['places'];
const defaultLocation = { lat: 25.0229, lng: 121.5027 };

export default function MapScreen(props) {

    const [googleApiKey, setGoogleApiKey] = useState('');
    const [center, setCenter] = useState(defaultLocation);
    const [location, setLocation] = useState(center);

    const mapRef = useRef(null);
    const placeRef = useRef(null);
    const markerRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            const { data } = await Axios.get('/api/config/google');
            setGoogleApiKey(data);
            getUserCurrentLocation();
        };
        fetch();
    }, []);

    const onLoad = (map) => {
        mapRef.current = map;
    };

    const onMarkerLoad = (marker) => {
        markerRef.current = marker;
    };

    const onLoadPlaces = (place) => {
        placeRef.current = place;
    };

    const onIdle = () => {
        setLocation({
            lat: mapRef.current.center.lat(),
            lng: mapRef.current.center.lng()
        })
    };

    const onPlacesChanged = () => {
        const place = placeRef.current.getPlaces()[0].geometry.location;
        setCenter({ lat: place.lat(), lng: place.lng() });
        setLocation({ lat: place.lat(), lng: place.lng() });
    };

    const onConfirm = () => {
        const places = placeRef.current.getPlaces();
        if (places && places.length === 1) {

            dispatch({
                type: USER_ADDRESS_MAP_CONFIRM,
                payload: {
                    lat: location.lat,
                    lng: location.lng,
                    address: places[0].formatted_address,
                    name: places[0].name,
                    vicinity: places[0].vicinity,
                    googleAddressId: places[0].id,
                }
            });

            alert('location selected successfully');

            props.history.push('/shipping');

        } else {
            alert('please enter your address');
        }
    };

    const getUserCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by this browser');
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            })
        }
    };


    return googleApiKey ? (
        <div className="full-container">
            <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
                <GoogleMap
                    id="sample-map"
                    mapContainerStyle={{ height: '100%', width: '100%' }}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onIdle={onIdle}
                >
                    <StandaloneSearchBox
                        onLoad={onLoadPlaces}
                        onPlacesChanged={onPlacesChanged}
                    >
                        <div className="map-input-box">
                            <input
                                type="text"
                                placeholder="Enter your address"
                            ></input>
                            <button
                                type="button"
                                className="primary"
                                onClick={onConfirm}
                            >Confirm</button>
                        </div>
                    </StandaloneSearchBox>
                    <Marker position={location} onLoad={onMarkerLoad}></Marker>
                </GoogleMap>
            </LoadScript>
        </div>
    ) : (
            <LoadingBox></LoadingBox>
        )
}
