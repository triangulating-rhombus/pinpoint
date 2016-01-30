import React, { 
  MapView,
  Component 
} from 'react-native';


import styles from '../styles/styles';
import { initialGeoLocation, updateGeoLocation } from '../socket/emitters';


export default class Map extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    let socket = this.props.socket;

    console.log("Store is inside Maps", this.props.socket);

    let success = (position) => {
      initialGeoLocation(socket, position);
    }

    let error = (error) => {
      console.log('ERROR', error);
    };

    let watchCallback = (position) => {
      updateGeoLocation(socket, position)
    };

    let options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(success, error);

    // Dispatch an action here
    navigator.geolocation.watchPosition(watchCallback, error, options);
  }

  render(){
    return (
      <MapView 
        style={styles.container}
        showsUserLocation={true}
        followUserLocation={false}
      />
    ); 
  }
};
