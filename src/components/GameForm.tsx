import React from 'react';
import Checkbox from 'expo-checkbox';
import {
  Box,
  FormControl,
  HStack,
  Slider,
  Stack,
  Text,
  theme,
} from 'native-base';
import {useRecoilState} from 'recoil';
import {gameConfig as _gameConfig, players as _players} from '../state/atoms';

const GameForm: React.FC<{}> = () => {
  const [gameConfig, setGameConfig] = useRecoilState(_gameConfig);
  const [players, setPlayers] = useRecoilState(_players);

  return (
    <Box my={5} w="80%">
      <FormControl isRequired>
        <Stack>
          <HStack justifyContent="space-between" alignItems="center">
            <FormControl.Label>
              <Text bold>Number of Players:</Text>
            </FormControl.Label>
            <FormControl.HelperText>
              <Text mt={-1}>{players.num}</Text>
            </FormControl.HelperText>
          </HStack>
          <Slider
            mr={5}
            defaultValue={players.min}
            minValue={players.min}
            maxValue={players.max}
            onChange={v => setPlayers({...players, num: Math.floor(v)})}>
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
            value={gameConfig.showCircle}
            color={theme.colors.primary[600]}
            onValueChange={v => setGameConfig({...gameConfig, showCircle: v})}
          />
          <Text ml={3}>Show Circle</Text>
        </HStack>
        <HStack>
          <Checkbox
            value={gameConfig.showCircle}
            onValueChange={v => setGameConfig({...gameConfig, showGrid: v})}
            color={theme.colors.primary[600]}
          />
          <Text ml={3}>Show Gridlines</Text>
        </HStack>
      </FormControl>
    </Box>
  );
};

export default GameForm;
