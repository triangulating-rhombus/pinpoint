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

import image from '../assets/images/redDot-small-whiteBorder.png';

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

var count = true;


export default class Map extends Component {

  componentDidUpdate(){
    // If component had updated because socket is now connected to the server run this code. Modified after code refactor.
    if(count && this.props.socket){
      this.setDefaults.call(this);
    }

  }

  componentDidMount(){
    if(this.props.socket){
      this.setDefaults.call(this)
    }
  }

  setDefaults(){

    initSocketListeners(this.props.socket);
    let properties = this.props;


    let connect = (position) => {
      initialGeoLocation(properties, position);
    }

    let error = (error) => {
      console.log('ERROR', error);
    };

    let update = (position) => {
      updateGeoLocation(properties, position);
    }

    navigator.geolocation.getCurrentPosition(connect, error);

    setInterval(function(){       
      navigator.geolocation.getCurrentPosition(update,error)  
    },5000); 

    count = false;

  }

  animateMarkers() {
    let allUsers = this.props.allUsers;
      
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

  renderMarkers(){

    let allUsers = this.props.allUsers;

    return _.map(allUsers, (value, user) => {

      let tags = value.tags = '';
      
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

  getRegion(){
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

  renderHotSpots(){
    return (
      <MapView.Circle 
        center={ {latitude:37.331177, longitude:-122.031641} }
        radius={300}
        strokeColor='rgba(200, 0, 0, 0.5)'
        fillColor='rgba(200, 0, 0, 0.5)'
      /> 
    );
  }

  onPress(e) {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    console.log('pressed map:', latitude, longitude);

    // For some reason, TabBarIOS counts a press on the map as a press on the map icon
    // This sets the displayed tab to mapTab again, so we have to delay the change to statsTab
    setTimeout(()=>this.props.changeTab('statsTab', { latitude, longitude }), 0);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView.Animated
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={true}
          onPress={(e) => this.onPress(e)}
        >
        { this.props.hotSpotVisibility ? this.renderHotSpots.call(this) : void 0 }
        { Object.keys(this.props.allUsers).length !== 0 ? this.renderMarkers.call(this) : void 0 }
        { Object.keys(this.props.allUsers).length !== 0 ? this.animateMarkers.call(this) : void 0 }

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

