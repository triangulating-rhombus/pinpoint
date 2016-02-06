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

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

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
    }, 5000); 

    count = false;

  }

  animateMarkers() {
    let allUsers = this.props.allUsers;
    
    // console.log(_.map(allUsers, function(user, userKey) {
    //   return userKey + ':' + user.pastNewPins[0].latitude._value + ',';
    // }));

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

      let tags = value.tags || '';
      
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
    // If you click on a marker (and possibly some other cases), Map doesn't return position data
    if (!e.nativeEvent || !e.nativeEvent.coordinate) {
      return;
    }
    
    const { latitude, longitude } = e.nativeEvent.coordinate;
    console.log('pressed map:', latitude, longitude);

    this.props.setPoi(latitude, longitude);


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
    this.props.toggleTag(tag);
    this.props.fetchTag(this.props.currentTagLabel);
  }

  renderPins(){
    var obj = {
      ALLTAGS: "Show All"
    };
    let allUsers = this.props.allUsers;    
     _.each(allUsers, (value, user) => {
      if (this.props.socket.id === user) {
        // TODO: send tags back from server.js on initial connection because we're waiting instead for the update 
        if(value.tags){
          value.tags.forEach(function(tag){
            obj[tag] = tag;
          })
        }
      }
      })
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
        { this.props.hotSpotVisibility ? this.renderHotSpots.call(this) : void 0 }
        { Object.keys(this.props.allUsers).length !== 0 ? this.renderMarkers.call(this) : void 0 }
        { Object.keys(this.props.allUsers).length !== 0 ? this.animateMarkers.call(this) : void 0 }

        </MapView.Animated>

        { this.props.socket ? this.renderFilterBar.call(this) : void 0 }

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

