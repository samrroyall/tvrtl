import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {RecoilRoot} from 'recoil';
import Home from './screens/Home';
import Arena from './screens/Arena';
import SignIn from './screens/SignIn';
import FullGameHistory from './screens/FullGameHistory';
import {GameResult, Player} from './models';

export type StackParamList = {
  SignIn: undefined;
  Home: {
    player: Player;
    gameHistory: GameResult[];
  };
  Arena: {
    gameHistory: GameResult[];
    player: Player;
    wager: number;
  };
  FullGameHistory: {
    gameHistory: GameResult[];
    player: Player;
  };
};

function App(): JSX.Element {
  const customTheme = extendTheme({
    config: {
      useSystemColorMode: false,
      initialColorMode: 'dark',
    },
  });

  LogBox.ignoreLogs([
    'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
    'Scripts "build/three.js" and "build/three.min.js" are deprecated with r150+, and will be removed with r160.',
  ]);

  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <RecoilRoot>
      <NativeBaseProvider theme={customTheme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{headerShown: false, title: 'tvrtl | Sign In'}}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                title: 'tvrtl | Home',
              }}
            />
            <Stack.Screen
              name="FullGameHistory"
              component={FullGameHistory}
              options={{
                headerShown: false,
                title: 'tvrtl | Game History',
              }}
            />
            <Stack.Screen
              name="Arena"
              component={Arena}
              options={{
                headerShown: false,
                title: 'tvrtl | Arena',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </RecoilRoot>
  );
}

export default App;
