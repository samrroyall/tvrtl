import React, {useMemo, useRef, useState} from 'react';
import {
  Box,
  Button,
  Center,
  ChevronDownIcon,
  ChevronUpIcon,
  FormControl,
  HStack,
  IconButton,
  Text,
  theme,
} from 'native-base';
import {useRecoilState, useRecoilValue} from 'recoil';
import {configAtom, gameAtom, playersAtom, turtleAtom} from '../state/atoms';
import TurtleApi from '../services/turtleApi';
import Checkbox from './Checkbox';
import Slider from './Slider';
import {Animated, Easing, View} from 'react-native';

const GameForm: React.FC<{}> = () => {
  const {mockDelay, useMock} = useRecoilValue(configAtom);
  const [game, setGame] = useRecoilState(gameAtom);
  const [players, setPlayers] = useRecoilState(playersAtom);
  const [turtle, setTurtle] = useRecoilState(turtleAtom);

  const ref = useRef<View>(null);
  const [formHeight, setFormHeight] = useState(0);
  const [showForm, setShowForm] = useState(true);

  const currFormHeight = useMemo(() => new Animated.Value(0), []);
  currFormHeight.addListener(({value}) => {
    if (ref.current) {
      ref.current.setNativeProps({
        style: {
          height: value,
        },
      });
    }
  });

  const handleOpenClose = () => {
    Animated.timing(currFormHeight, {
      toValue: showForm ? 0 : formHeight,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    setShowForm(!showForm);
  };

  const setTurtlePoints = (): void => {
    if (showForm) {
      handleOpenClose();
    }
    const normalizedPoints = TurtleApi.getTurtlePath({mockDelay, useMock});
    setGame({...game, simulationStarted: true, simulationFinished: false});
    setTurtle({...turtle, points: normalizedPoints});
  };

  const resetTurtlePoints = (): void => {
    setTurtle({...turtle, points: undefined});
    setGame({...game, simulationStarted: false, simulationFinished: false});
    if (!showForm) {
      handleOpenClose();
    }
  };

  const sliders = (
    <HStack w="100%" display="flex" justifyContent="space-between">
      <Slider
        label="# of Players"
        value={players.numPlayers}
        minValue={players.minPlayers}
        maxValue={players.maxPlayers}
        step={1}
        w="45%"
        onChange={v =>
          setPlayers({
            ...players,
            numPlayers: Math.floor(v),
            playerIdx: Math.min(players.playerIdx, Math.floor(v) - 1),
          })
        }
      />
      <Slider
        label="Current Player"
        value={players.playerIdx + 1}
        minValue={1}
        maxValue={players.numPlayers}
        step={1}
        w="45%"
        onChange={v => setPlayers({...players, playerIdx: Math.floor(v) - 1})}
      />
    </HStack>
  );

  const checkboxes = (
    <Box display={game.showConfigForm ? 'block' : 'none'} w="100%">
      <FormControl.Label w="100%">
        <Text bold>Config:</Text>
      </FormControl.Label>
      <Checkbox
        value={game.showCircle}
        color={theme.colors.primary[600]}
        onValueChange={v => setGame({...game, showCircle: v})}
        label="Show Circle"
      />
      <Checkbox
        value={game.showGrid}
        onValueChange={v => setGame({...game, showGrid: v})}
        color={theme.colors.primary[600]}
        label="Show Gridlines"
      />
    </Box>
  );

  const runButton = (
    <Button
      mt={3}
      w="100%"
      onPress={() =>
        game.simulationStarted ? resetTurtlePoints() : setTurtlePoints()
      }>
      {game.simulationStarted ? 'Reset' : 'Run'}
    </Button>
  );

  const openCloseButton = (
    <IconButton
      display={game.simulationStarted ? 'none' : 'block'}
      icon={
        showForm ? <ChevronUpIcon size="lg" /> : <ChevronDownIcon size="lg" />
      }
      onPress={handleOpenClose}
    />
  );

  return (
    <Box px={5} w="100%">
      <View
        ref={ref}
        style={{overflow: 'hidden'}}
        onLayout={event => {
          const {height} = event.nativeEvent.layout;
          if (formHeight === 0) {
            setFormHeight(height);
            currFormHeight.setValue(height);
          }
        }}>
        <FormControl isRequired>
          <Center px={3}>
            {sliders}
            {checkboxes}
          </Center>
        </FormControl>
      </View>
      {runButton}
      {openCloseButton}
    </Box>
  );
};

export default GameForm;
