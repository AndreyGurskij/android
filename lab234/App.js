import {
  createAppContainer
} from 'react-navigation';
import React from 'react';

import {
  createStackNavigator
} from 'react-navigation-stack'
import SearchScreen from './screens/SearchScreen';
import ItemScreen from './screens/ItemScreen';

const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: SearchScreen,
      navigationOptions: {
        header: null,
      },
    },
    ItemScreen: ItemScreen,
  },
  {
    cardStyle: { backgroundColor: 'white' },
  },
);
const RouterComponent = createAppContainer(stackNavigator);

export default class App extends React.Component {
  render() {
    return (
      <RouterComponent />
    );
  }
}
