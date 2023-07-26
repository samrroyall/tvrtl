import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Checkbox from 'expo-checkbox';
import {
  Box,
  Center,
  FormControl,
  HStack,
  Heading,
  NativeBaseProvider,
  Slider,
  Stack,
  Text,
  extendTheme,
  theme,
} from 'native-base';
import Game from './components/Game';
//import {Canvas} from '@react-three/fiber/native';

function App(): JSX.Element {
  const minPlayers = 3;
  const maxPlayers = 12;
  const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  };

  const customTheme = extendTheme({config});
  const [numPlayers, setNumPlayers] = useState(minPlayers);
  const [showCircle, setShowCircle] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const header = <Heading>tvrtl</Heading>;
  const numPlayersForm = (
    <Box my={5} w="80%">
      <FormControl isRequired>
        <Stack>
          <HStack justifyContent="space-between" alignItems="center">
            <FormControl.Label>
              <Text bold>Number of Players:</Text>
            </FormControl.Label>
            <FormControl.HelperText>
              <Text mt={-1}>{numPlayers}</Text>
            </FormControl.HelperText>
          </HStack>
          <Slider
            mr={5}
            defaultValue={minPlayers}
            minValue={minPlayers}
            maxValue={maxPlayers}
            onChange={v => setNumPlayers(Math.floor(v))}>
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </Stack>
      </FormControl>
      <FormControl>
        <FormControl.Label>
          <Text bold>Config:</Text>
        </FormControl.Label>
        <HStack>
          <Checkbox
            value={showCircle}
            color={theme.colors.primary[600]}
            onValueChange={setShowCircle}
          />
          <Text ml={3}>Show Circle</Text>
        </HStack>
        <HStack>
          <Checkbox
            value={showGrid}
            onValueChange={setShowGrid}
            color={theme.colors.primary[600]}
          />
          <Text ml={3}>Show Gridlines</Text>
        </HStack>
      </FormControl>
    </Box>
  );

  return (
    <NativeBaseProvider theme={customTheme}>
      <Box safeArea style={styles.appWrapper} bg="coolGray.800">
        <Center>{header}</Center>
        <Center>{numPlayersForm}</Center>
        <Box
          style={styles.gameWrapper}
          justifyContent="center"
          alignItems="center">
          <Game
            size={350}
            numPlayers={numPlayers}
            config={{showGrid, showCircle}}
          />
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  appWrapper: {
    height: '100%',
    //borderWidth: 1,
    //borderColor: 'red',
  },
  gameWrapper: {
    height: 400,
    //borderWidth: 1,
    //borderColor: 'blue',
  },
});

export default App;
