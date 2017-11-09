import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { compose, withStateHandlers } from "recompose";
import { connect } from "react-redux";



class Map extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.currentRestaurant.coordinates !== nextProps.currentRestaurant.coordinates) return true;
        else return false;
    }

    render() {

        const { name, coordinates, location } = this.props.currentRestaurant;
        console.log("coordinates", this.props.currentRestaurant.coordinates);
        console.log("whole", this.props.currentRestaurant);
        let latitude = 0;
        let longitude = 0;
        let address1 = '';
        let address2 = '';
        let address3 = ''
        if (coordinates === undefined && location === undefined) {
            latitude = 111.6608;
            longitude = 40.2263;
        } else {
            latitude = coordinates.latitude;
            longitude = coordinates.longitude;
            address1 = location.display_address[0];
            address2 = location.display_address[1];
            address3= location.display_address[2];
        }

        const MapWithAMakredInfoWindow = compose(
            withStateHandlers(() => ({
                isOpen: false,
            }), {
                    onToggleOpen: ({ isOpen }) => () => ({
                        isOpen: !isOpen,
                    })
                }),
            withScriptjs,
            withGoogleMap
        )(props =>
            <GoogleMap
                defaultZoom={13}
                defaultCenter={{ lat: latitude, lng: longitude }}
            >
                <Marker
                    position={{ lat: latitude, lng: longitude }}
                    onClick={props.onToggleOpen}
                >
                    {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                        <div>
                            <p style={{fontWeight:"bold", fontSize:"20px"}}>{name} </p>
                            <p style={{fontSize:"15px"}}> {address1} {address2} {address3}</p>
                        </div>
                    </InfoWindow>}
                </Marker> 

            </GoogleMap>
            );
        return (
            <div>
                <MapWithAMakredInfoWindow
                   googleMapURL={process.env.REACT_APP_GOOGLE_MAP_URL}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentRestaurant: state.currentRestaurant,
    }
}

export default connect(mapStateToProps)(Map)