import React from 'react';
import {LogBox} from 'react-native';
import {
  Box,
  Center,
  Heading,
  NativeBaseProvider,
  extendTheme,
} from 'native-base';
import {RecoilRoot} from 'recoil';
import Game from './components/Game';
import GameForm from './components/GameForm';

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

  return (
    <RecoilRoot>
      <NativeBaseProvider theme={customTheme}>
        <Box
          safeArea
          h="100%"
          bg="coolGray.800"
          display="flex"
          justifyContent="space-between">
          <Center w="100%">
            <Heading>tvrtl</Heading>
            <GameForm />
          </Center>
          <Game />
        </Box>
      </NativeBaseProvider>
    </RecoilRoot>
  );
}

export default App;
