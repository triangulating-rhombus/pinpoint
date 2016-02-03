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

// import styles from '../styles/styles';
import MapView from 'react-native-maps';

import initSocketListeners from '../socket/listeners.js';
import { initialGeoLocation, updateGeoLocation } from '../socket/emitters';

var screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      coordinate: new Animated.Region({
        latitude: LATITUDE,
        longitude: LONGITUDE,
      }),
    }
  }

  componentDidUpdate(){
    console.log('IT WORKED', this.props.allUsers);
  }

  componentDidMount(){
    let properties = this.props;


    let connect = (position) => {
      console.log('CONNECTING TO SOCKET');
      initialGeoLocation(properties, position);
    }

    let error = (error) => {
      console.log('ERROR', error);
    };

    let update = (position) => {
      console.log('UPDATING');
      updateGeoLocation(properties, position);
    }

    initSocketListeners(this.props.socket);

    // Create Socket Connection
    navigator.geolocation.getCurrentPosition(connect, error);


    // NOTE: React Native strongly discourags setInterval, but the SetInterval Mixin 
    // is not supported by ES6. So for MVP purposes we're going with SetInterval
    setInterval(function(){       
      navigator.geolocation.getCurrentPosition(update,error)  
    },5000); // If you want to do this in xcode using watchPosition,
       // Modify pinpoint/libraries/RCTGeolocation.xcodeproj/RCTLocationObserver.m distance filter variable. use command click
  }


  animate() {
    var { coordinate } = this.state;
    var latitude = 37.33182;
    var longitude = -122.03118; 
    coordinate.timing({latitude, longitude }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={true}
        >
          <MapView.Marker.Animated
            coordinate={this.state.coordinate}
          />
        </MapView>
        
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.animate.bind(this)} style={[styles.bubble, styles.button]}>
              <Text>Animate</Text>
            </TouchableOpacity>
        </View>
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

