import React, {
  Component,
  StyleSheet,
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  Platform, 
} from 'react-native';

import image from '../assets/images/check.png';

// import styles from '../styles/styles';
import MapView from 'react-native-maps';
import _ from 'underscore';
import initSocketListeners from '../socket/listeners.js';
import { initialGeoLocation, updateGeoLocation } from '../socket/emitters';

var getRandomColor = function() {
   var letters = '0123456789ABCDEF'.split('');
   var color = '#';
   for (var i = 0; i < 6; i++ ) {
       color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
}


export default class Map extends Component {

  componentDidMount(){
    let properties = this.props;


    let connect = (position) => {
      console.log('CONNECTING TO SOCKET',position);
      initialGeoLocation(properties, position);
    }

    let error = (error) => {
      console.log('ERROR', error);
    };

    let update = (position) => {
      updateGeoLocation(properties, position);
    }

    initSocketListeners(this.props.socket);

    // Create Socket Connection
    navigator.geolocation.getCurrentPosition(connect, error);

    // let centerMap = (position) => {
    //   var newLocation = {longitude:position.coords.longitude, latitude:position.coords.latitude};
    //   this.setState({coords: newLocation});
    // }
    // setInterval(() => {
    //   navigator.geolocation.getCurrentPosition(centerMap,error);
    // }, 500);



    // NOTE: React Native strongly discourags setInterval, but the SetInterval Mixin 
    // is not supported by ES6. So for MVP purposes we're going with SetInterval
    setInterval(function(){       
      navigator.geolocation.getCurrentPosition(update,error)  
    },5000); // If you want to do this in xcode using watchPosition,
       // Modify pinpoint/libraries/RCTGeolocation.xcodeproj/RCTLocationObserver.m distance filter variable. use command click
  }

  animateMarkers() {
    let allUsers = this.props.allUsers;

    if(Object.keys(allUsers).length !== 0){
      
      _.each(allUsers, (value, user) => {
        if(value.pastNewPins.length < 2 ){
          return
        } else {
          var oldLatLng = value.pastNewPins[0];
          var longitude = value.pastNewPins[1].longitude._value;
          var latitude = value.pastNewPins[1].latitude._value;

          // this should render each user's lat long on every prop update 
          oldLatLng.timing({latitude, longitude}).start();       
        }
      }); 

    }

  }

  renderMarkers(){

    let allUsers = this.props.allUsers;
    let tags = '';

    if(Object.keys(allUsers).length !== 0) {

      return _.map(allUsers, (value, user) => {

        tags = value.tags;
        
        if(tags){
          tags = tags.join(', ');
        }


        return (
          <MapView.Marker.Animated
            image={image}
            title={tags}
            key={user}
            coordinate={value.pastNewPins[0]}
            pinColor={getRandomColor()}
          />
        );

      });
    }

  }

  getRegion(){
    console.log('re-rendering');
    var socketId = this.props.socket.id;
    var currentUser = this.props.allUsers[socketId];

    if(currentUser === undefined){
      return;
    } else if(currentUser.pastNewPins.length === 2){

      var longitude = currentUser.pastNewPins[1].longitude._value;
      var latitude = currentUser.pastNewPins[1].latitude._value;
      var newRegion = {latitude, longitude };
      return newRegion;
      //return currentUser.pastNewPins[0].setValue(newRegion);
 
    }

  }

  render() {

    return (
      <View style={styles.container}>
        <MapView.Animated
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={true} 
        >
        { this.renderMarkers.call(this) }
        { this.animateMarkers.call(this) }
        </MapView.Animated>



      </View>
    );
  }

};



var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

