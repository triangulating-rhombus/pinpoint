import React, {
  Component,
  Navigator
} from 'react-native';
import styles from '../assets/styles/styles';

import Login from '../containers/container_login';
import Signup from '../containers/container_signup';
import Settings from '../containers/container_settings';
import Stats from '../containers/container_stats';
import Map from '../containers/container_map';
import TabBar from '../containers/container_tabBar';

const ROUTES = { Login, Signup, Settings, Stats, Map, TabBar };

export default class Router extends Component {
  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  }

  render() {
    return (
      <Navigator
        style={styles.basicContainer}
        initialRoute={{name: 'Login'}}
        renderScene={this.renderScene}
        configureScene = { () => Navigator.SceneConfigs.FloatFromRight }
      />
    );
  }
}