// Template from: https://facebook.github.io/react-native/docs/tabbarios.html
import React, { Component, StyleSheet, TabBarIOS, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Settings from '../containers/settings-container';
import Stats from '../containers/stats-container';
import MapView from '../containers/map-container';

const ROUTES = { Settings, Stats, MapView };

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'mapTab',
      notifCount: 0,
      presses: 0,
      data: null // any data needing to be passed between child views
    };
  }

  _renderContent(color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  }

  changeTab(tabName, data) {
    if (tabName === 'logoutTab') {
      this.props.logoutUser(this.props.navigator);
    } else {
      this.setState({ selectedTab: tabName, data });
    }
  }
  
  renderScene(routeName) {
    var Component = ROUTES[routeName];
    return (
      <Component
        changeTab={this.changeTab.bind(this)}
        navigator={this.props.navigator}
        data={this.state.data}
      />
    );
  }

  render() {
    return (
      <TabBarIOS
        tintColor="black"
        barTintColor="white">
        <Icon.TabBarItem
          title="Statistics"
          iconName="stats-bars"
          selectedIconName="stats-bars"
          selected={this.state.selectedTab === 'statsTab'}
          onPress={() => this.changeTab('statsTab') }>
          {this.renderScene('Stats')}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Map"
          iconName="ios-navigate-outline"
          selectedIconName="ios-navigate"
          //badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'mapTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'mapTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this.renderScene('MapView')}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Settings"
          iconName="ios-gear-outline"
          selectedIconName="ios-gear"
          selected={this.state.selectedTab === 'settingsTab'}
          onPress={() => this.changeTab('settingsTab') }>
          {this.renderScene('Settings')}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Logout"
          iconName="android-exit"
          selectedIconName="android-exit"
          selected={this.state.selectedTab === 'logoutTab'}
          onPress={() => this.changeTab('logoutTab') }>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }

}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});
