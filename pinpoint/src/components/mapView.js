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
} from 'react-native';

import image from '../assets/images/greenDot-small-whiteBorder.png';
import Icon from 'react-native-vector-icons/Ionicons';

var {height, width} = Dimensions.get('window');


// import styles from '../styles/styles';
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
          title={tags}
          key={socketID}
          coordinate={value.pastNewPins[0]}
        />
      );
    });
  } 

  getRegion(){
    var socketID = this.props.socket.id;
    var currentUser = this.props.markers[socketID];

    if (currentUser && currentUser.pastNewPins.length === 2){
      return {
          latitude: currentUser.pastNewPins[1].latitude._value,
          longitude: currentUser.pastNewPins[1].longitude._value
        };
      //return currentUser.pastNewPins[0].setValue(newRegion);
    }
  }

  adjustMapScale(data){
    var lat = data.latitudeDelta;

    if(lat > 2){
      radius = 100000;
      console.log('I at n > 2');
    }
    if(lat > 1 && lat < 2){
      radius = 3000;
      console.log('I at 1 - 2');
    }
    if( lat > .1 && lat < 1) {
      console.log("I at .1 - 1");
      radius = 1000;
    }
    if(lat > 0.04 && lat < .1){
      console.log('I at .04 - .1');
      radius = 10000;
    } 
    if(lat < 0.04){
      console.log('I at .04 > n');
      radius=200;
    }

    // console.log('latitudeDelta', data.latitudeDelta);
    // console.log('Radius', radius);
    this.setState({radius:radius})
  }

  renderHotSpots(){
    return this.props.hotSpotPins.map((hotSpots) => {
      console.log('Hotspots are:', hotSpots)
      return (
        <MapView.Circle 
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
    console.log('pressed map:', latitude, longitude);

    this.props.setPoi(latitude, longitude, this.props.settings.tag1);


    // For some reason, TabBarIOS counts a press on the map as a press on the map icon
    // This sets the displayed tab to mapTab again, so we have to delay the change to statsTab
    setTimeout(()=>this.props.changeTab('statsTab'), 0);
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
        // <TouchableHighlight style={styles.button} onPress={this.showPopover.bind(this)}>
        //   <Text style={styles.text}>Filter</Text>
        // </TouchableHighlight>
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

  render() {
    return (
      <View style={styles.container}>
        <MapView.Animated
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChangeComplete={this.adjustMapScale.bind(this)}
          onPress={(e) => this.onPress(e)}
        >

        { this.props.hotSpotPins.length !== 0 ? this.renderHotSpots.call(this) : void 0 }
        { Object.keys(this.props.markers).length !== 0 ? this.renderMarkers.call(this) : void 0 }
        { Object.keys(this.props.markers).length !== 0 ? this.animateMarkers.call(this) : void 0 }
        
        </MapView.Animated>

        { this.props.socket.connection && this.props.settings ? this.renderFilterBar.call(this) : void 0 }



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

