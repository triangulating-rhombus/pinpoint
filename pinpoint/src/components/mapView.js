import React, { 
  Component,
  Animated
} from 'react-native';

import styles from '../styles/styles';
import MapView from 'react-native-maps';

import initSocketListeners from '../socket/listeners.js';

import { initialGeoLocation, updateGeoLocation } from '../socket/emitters';


export default class Map extends Component {

  componentDidMount() {
    let properties = this.props;

    let success = (position) => {
      console.log('GETTING INITIAL LOCATION', position);
      initialGeoLocation(properties, position);
    }

    let error = (error) => {
      console.log('ERROR', error);
    };

    let watchCallback = (position) => {
      updateGeoLocation(properties, position);
    }

    initSocketListeners(this.props.socket);

    let count = true;

    // NOTE: React Native strongly discourags setInterval, but the SetInterval Mixin 
    // is not supported by ES6. So for MVP purposes we're going with SetInterval
    setInterval(function(){
      if(count){
        navigator.geolocation.getCurrentPosition(success, error);
        count = false;        
      } else {
        navigator.geolocation.getCurrentPosition(watchCallback,error)  
      }
    }.bind(this),5000); // If you want to do this in xcode using watchPosition,
    // Modify pinpoint/libraries/RCTGeolocation.xcodeproj/RCTLocationObserver.m distance filter variable. use command click
  }
  /* FYI Render is only called once. That is why the 
  the followusersLocation doesn't track. If you want to
  uodate the render (either because connecting users aren't
  being deisplayed) you'll have to pass in props to re-update 
*/
  render(){
    var markers = 
      {
        latitude: 37.78825,
        longitude: -122.4324,
      }
    ;

    return (
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followUserLocation={true}
       >
        <MapView.Marker 
          coordinate={markers}
        />     
     </MapView>

    ); 
  }
};


