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
      radius: 300
    };
  }

  animateMarkers() {
    const { allUsers } = this.props;
    
    // console.log(_.map(allUsers, function(user, userKey) {
    //   return userKey + ':' + user.pastNewPins[0].latitude._value + ',';
    // }));

    _.each(allUsers, (value, user) => {
      if(value.pastNewPins.length < 2 || value.socketID){
        return;
      } else {
        var oldLatLng = value.pastNewPins[0];
        var longitude = value.pastNewPins[1].longitude._value;
        var latitude = value.pastNewPins[1].latitude._value;

        // this should render each user's lat long on every prop update 
        oldLatLng.timing({latitude, longitude}).start();       
      }
    }); 

  }

  renderMarkers() {
    const { allUsers } = this.props;
    return _.map(allUsers, (value, user) => {
      const tags = value.tags.join(', ');

      return (
        <MapView.Marker.Animated
          image={image}
          title={tags}
          key={user}
          coordinate={value.pastNewPins[0]}
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
    let update = (position) => {
      updateGeoLocation(this.props, position);
    };

    let error = (error) => {
      console.log('ERROR', error);
    };
    
    navigator.geolocation.getCurrentPosition(update, error);  

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
        <TouchableHighlight style={styles.button} onPress={this.showPopover.bind(this)}>
          <Text style={styles.text}>Filter</Text>
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

     //<MapView.Circle 
          // center={{longitude: -122.026484, latitude: 37.330041}}
          //radius={this.state.radius}
          //strokeColor='rgba(200, 0, 0, 0.5)'
          //fillColor='rgba(200, 0, 0, 0.5)'
        ///>
 
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
        { Object.keys(this.props.allUsers).length !== 0 ? this.renderMarkers.call(this) : void 0 }
        { Object.keys(this.props.allUsers).length !== 0 ? this.animateMarkers.call(this) : void 0 }
        
        </MapView.Animated>

        { this.props.socket && this.props.settings ? this.renderFilterBar.call(this) : void 0 }

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

