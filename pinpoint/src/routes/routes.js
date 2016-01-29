import React, {
  Component,
  Navigator
} from 'react-native';

import Login from '../containers/login-container.js';
import MapView from '../containers/map-container.js';

class Navigation extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <Navigator
        initialRoute={{id: 'Login'}}
        renderScene={this.navigatorRenderScene}
        configureScene = { () => Navigator.SceneConfigs.FloatFromRight }
      />
    );
  }

  navigatorRenderScene(route, navigator) {
    switch (route.id) {
      case 'Login':
        return (<Login navigator={navigator} />);
      case 'Signup':
        return (<Login navigator={navigator} />);
      case 'MapView':
        return (<MapView navigator={navigator} />);
      default:
        return (<Login navigator={navigator} />);
    }
  }
}
export default Navigation;
