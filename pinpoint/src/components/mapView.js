import React, { 
  MapView,
  StyleSheet, 
} from 'react-native';


const Map = (props) => {
  
  console.log("Receiving props in MapView component:", props );
  return (
    <MapView style={styles.container}> 
    </MapView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})

export default Map
