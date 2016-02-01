import React, { 
  Component, 
} from 'react-native';

import styles from '../styles/styles';
import MapView from 'react-native-maps';
import initSocketListeners from '../socket/listeners.js';

import { initialGeoLocation, updateGeoLocation } from '../socket/emitters';


export default class Map extends Component {

  componentDidMount() {
    let properties = this.props;


    let success = (position) => {
      initialGeoLocation(properties, position);
    }

    let error = (error) => {
      console.log('ERROR', error);
    };

    let watchCallback = (position) => {
      console.log("UPDATING POSITION", position);
      // updateGeoLocation(socket, position)
    };

    let options = {
      enableHighAccuracy: false,
      timeout: 1000,
      maximumAge: 0
    };


    initSocketListeners(this.props.socket);
    navigator.geolocation.getCurrentPosition(success, error);

    // Dispatch an action here
    // navigator.geolocation.watchPosition(watchCallback, error, options);
  }

  render(){
    return (
     <MapView
       style={styles.container}
       showsUserLocation={true} 
       followUserLocation={true}
     />
    ); 
  }
};


