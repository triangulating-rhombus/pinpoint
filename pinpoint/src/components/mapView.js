import React, { 
  MapView,
  Component 
} from 'react-native';

import styles from '../styles/styles';

export default class Map extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    let success = (position) => {
      // console.log('POSITION', position);
    };

    let error = (error) => {
      console.log('ERROR', error);
    };

    let watchCallback = (position) => {
      // console.log('Updating Position',position);
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