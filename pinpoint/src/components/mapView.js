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
    };
  }

  componentDidUpdate(){
    // If component had updated because socket is now connected to the server run this code. Modified after code refactor.
    
    
    if(count && this.props.socket){
      count = false;
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
      updateGeoLocation(this.props, position);
    }

    navigator.geolocation.getCurrentPosition(connect, error);

    setInterval(function(){       
      navigator.geolocation.getCurrentPosition(update, error)  
    }, 5000); 
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

  renderPins(){
    var obj = {
      ALLTAGS: "Show All"
    };
    var meTags = this.props.me.tags;
    meTags.forEach(function(val){
      obj[val] = val;
    });

    return obj;
  }

  renderFilterBar(){
    return (
      <View style={styles.overlay}>
        <TouchableHighlight style={styles.button} onPress={this.showPopover.bind(this)}>
          <Text style={styles.text}>Filter</Text>
        </TouchableHighlight>
        <ListPopover
          list={this.renderPins.call(this)}
          isVisible={this.state.isVisible}
          onClick={this.setItem.bind(this)}
          onClose={this.closePopover.bind(this)}/>
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
    top: 0,
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
  overlay: {
    position: 'relative',
    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
    flex:1
  },
  text: {
    position: 'relative',
    flex:0,
    color:'white'
  },

  button: {
    position: 'relative',
    flex: 0,
    borderRadius: 4,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'blue',
    opacity:.4
  },
});

