import React from 'react';
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

  return (
    <RecoilRoot>
      <NativeBaseProvider theme={customTheme}>
        <Box safeArea h="100%" bg="coolGray.800">
          <Center>
            <Heading>tvrtl</Heading>
          </Center>
          <Center>
            <GameForm />
            <Game />
          </Center>
        </Box>
      </NativeBaseProvider>
    </RecoilRoot>
  );
}

export default App;
