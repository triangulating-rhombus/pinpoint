import React, { 
  MapView,
  StyleSheet,
  Component 
} from 'react-native';


class Map extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = JSON.stringify(position);
          console.log(initialPosition);
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
      this.watchID = navigator.geolocation.watchPosition((position) => {
        var lastPosition = JSON.stringify(position);
      });
  }

  render(){
    return (
      <MapView 
        style={styles.container}
        showsUserLocation={true}
        followUserLocation={true}
      >
      </MapView>
    );   
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})

export default Map
