import React, {
  Component,
  StyleSheet,
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Platform,
  Modal
} from 'react-native';

import image from '../assets/images/greenDot-small-whiteBorder.png';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomCallout from './customCallout';
import Stats from '../containers/container_stats';

var {height, width} = Dimensions.get('window');


// import styles from '../assets/styles/styles';
import MapView from 'react-native-maps';
var ListPopover = require('react-native-list-overlay');

import _ from 'underscore';

var count = true;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      radius: 300
    };
  }

  animateMarkers() {
    const { markers } = this.props;

    // Animate each marker, if it has a previous and current position
    _.each(markers, (value) => {
      if (value.pastNewPins.length === 2) {
        var oldPosition = value.pastNewPins[0];
        var newPosition = {
          latitude: value.pastNewPins[1].latitude._value,
          longitude: value.pastNewPins[1].longitude._value
        };

        oldPosition.timing(newPosition).start();       
      }
    }); 

  }

  renderMarkers() {
    const { markers } = this.props;
    return _.map(markers, (value, socketID) => {
      
      const tags = value.tags.join(', ');
      return (

        <MapView.Marker.Animated
          image={image}
          key={socketID}
          coordinate={value.pastNewPins[0]}
        >
          <MapView.Callout tooltip>
            <CustomCallout>
              <Text style={{ color: 'white', alignSelf:'center', fontSize:15 }}>{tags}</Text>
            </CustomCallout>
          </MapView.Callout>

        </MapView.Marker.Animated>
      );
    });
  } 

  renderHotSpots(){
    return this.props.hotspots.data.map((hotSpots) => {
      return (
        <MapView.Circle
          key={hotSpots.latitude} 
          center={hotSpots}
          radius={40}
          strokeColor='rgba(200, 0, 0, 0.5)'
          fillColor='rgba(200, 0, 0, 0.5)'
        />
      );
    });
  }

  onPress(e) {
    // If you click on a marker (and possibly some other cases), Map doesn't return position data
    if (!e.nativeEvent || !e.nativeEvent.coordinate) {
      return;
    }
    
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const tag = (this.props.tag === 'Show All') ? null : this.props.tag;
    console.log('pressed map:', latitude, longitude);
    this.props.updateStats(latitude, longitude, tag);

    // For some reason, TabBarIOS counts a press on the map as a press on the map icon
    // This sets the displayed tab to mapTab again, so we have to delay the change to statsTab
    // setTimeout(()=>this.props.changeTab('statsTab'), 0);
  }

  showPopover() {
      this.setState({isVisible: true});
  }

  closePopover() {
      this.setState({isVisible: false});
  }

  setItem(tag){
    const { connection, id } = this.props.socket;
    connection.emit('changeFilterTag', { socketID: id, filterTag: tag });
    this.props.setTag(tag);
    // ---- Copied from action_add_socket as a quick fix ----
    function emitSnapshot(gpsData) {
      var socketData = {
        socketID: id,
        time: gpsData.timestamp,
        latitude: gpsData.coords.latitude,
        longitude: gpsData.coords.longitude,
      };

      connection.emit('update', socketData );
    }

    function logError(error) {
      console.log('Navigator \'getCurrentPosition\' error:', error);
    };

    // Sends  snapshot to server
    navigator.geolocation.getCurrentPosition(gpsData => emitSnapshot(gpsData), logError);
    // ---- End copied code from action_add_socket ----
  }

  getFilterOptions(){
    var filterOptions = {
      ALLTAGS: "Show All"
    };
    const { tag1, tag2, tag3 } = this.props.settings;
    _.forEach([ tag1, tag2, tag3 ], function(tag) {
      if (tag) {
        filterOptions[tag] = tag;
      }
    });

    return filterOptions;
  }

  renderFilterBar(){
    return (
      <View style={styles.overlay}>
      <TouchableHighlight style={styles.wrapper} underlayColor='#FFE' onPress={this.showPopover.bind(this)}>
        <Icon name="ios-pricetags" size={25} style={styles.filterIcon} >
          <Text style={styles.button}></Text>
        </Icon>
      </TouchableHighlight>
        <ListPopover
          list={this.getFilterOptions.call(this)}
          isVisible={this.state.isVisible}
          onClick={this.setItem.bind(this)}
          onClose={this.closePopover.bind(this)}
        />
      </View>
    );
  }

  changeToRegion(data){

    var newLocation = {
      longitudeDelta: data.longitudeDelta,
      latitude: data.latitude,
      longitude: data.longitude,
      latitudeDelta: data.latitudeDelta  
    };

    this.setState({location: newLocation })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView.Animated
          style={styles.map}          
          initialRegion={{longitudeDelta: 0.05000044296161832, latitude: 37.77644419981398,longitude: -122.4142810713981, latitudeDelta: 0.0636722351829988  }}
          showsUserLocation={true}
          followUserLocation={true}
          onPress={(e) => this.onPress(e)}
        >

        { this.props.hotspots.isVisible && !this.props.hotspots.warning ? this.renderHotSpots.call(this) : void 0 }
        { Object.keys(this.props.markers).length !== 0 ? this.renderMarkers.call(this) : void 0 }
        { Object.keys(this.props.markers).length !== 0 ? this.animateMarkers.call(this) : void 0 }
        
        </MapView.Animated>

        { this.props.socket.connection && this.props.settings ? this.renderFilterBar.call(this) : void 0 }

        <Stats />

      </View>
    );
  }
};
var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wrapper: {
    borderRadius:5,
    marginLeft:10,
    width:50,
    borderWidth:1.5,
    padding:3,
    backgroundColor:'white',
    shadowRadius:10,
    borderColor:'black'
  },
  overlay: {
    position: 'relative',
    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
    flex:1,
  },
  text: {
    position:'relative',
    color:'white',
    textAlign:'center'
  },

  filterIcon:{
    alignSelf:"center"
  },

  button: {
    position: 'relative',
    padding: 10,
    marginLeft:5,
    borderRadius:5,
    backgroundColor: '#222',
    opacity:.4
  },
});

