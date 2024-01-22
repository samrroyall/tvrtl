import React, {useEffect, useState} from 'react';
import {
  ArrowBackIcon,
  Center,
  Heading,
  IconButton,
  StatusBar,
  Text,
  theme,
} from 'native-base';
import {useRecoilState, useRecoilValue} from 'recoil';
import {configAtom, gameAtom, playersAtom, turtleAtom} from '../state/atoms';
import Simulation from '../components/Simulation';
import {StackParamList} from '../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import turtleApi from '../services/turtleApi';
import playerApi from '../services/playerApi';
import {motionSelector} from '../state/selectors';
import {GameResult} from '../models';
import uuid from 'react-native-uuid';
import storage from '../state/storage';
import {
  handleSaveStorageError,
  loadStoredGameHistory,
  loadStoredPlayer,
} from '../helpers';

type ArenaProps = NativeStackScreenProps<StackParamList, 'Arena'>;

const Arena: React.FC<ArenaProps> = ({navigation, route}) => {
  const {backgroundColor, mockDelay, tokenColor, useMock} =
    useRecoilValue(configAtom);
  const [turtle, setTurtle] = useRecoilState(turtleAtom);
  const [sim, setSim] = useRecoilState(gameAtom);
  const [_players, setPlayers] = useRecoilState(playersAtom);
  const {losingSectorIdx} = useRecoilValue(motionSelector);

  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const storeGame = async (gr: GameResult) => {
    const gameHistory = await loadStoredGameHistory();
    await storage
      .save({
        key: 'gameHistory',
        data: [...gameHistory, gr],
      })
      .then(_ => setGameResult(gr))
      .catch(handleSaveStorageError);
  };

  const storeUpdatedPlayer = async (tokenDelta: number) => {
    const player = await loadStoredPlayer();
    if (!player) {
      navigation.navigate('SignIn');
      return;
    }
    await storage
      .save({
        key: 'player',
        data: {...player, tokens: player.tokens + tokenDelta},
      })
      .catch(handleSaveStorageError);
  };

  const runSimulation = async () => {
    // Load board and players
    setSim({...sim, isLoading: true});
    const player = await loadStoredPlayer();
    if (!player) {
      navigation.navigate('SignIn');
      return;
    }
    const players = await playerApi.getPlayers({
      currPlayer: player,
      mockDelay,
      useMock,
      maxPlayers: _players.maxPlayers,
      minPlayers: _players.minPlayers,
    });
    const playerIdx = players.findIndex(p => p.uuid === player.uuid);
    setPlayers({..._players, players, playerIdx});
    setSim({...sim, isLoading: false});
    // Get points and start simulation
    const points = await turtleApi.getTurtlePath({mockDelay, useMock});
    setSim({...sim, simulationStarted: true, simulationFinished: false});
    setTurtle({...turtle, points});
  };

  const handleSimulationResult = async () => {
    const lostGame = losingSectorIdx === _players.playerIdx!;
    const numPlayers = _players.players!.length;
    const wager = route.params.wager;
    const tokenDelta = lostGame ? -wager : wager / (numPlayers - 1);
    await storeGame({
      uuid: uuid.v4() as string,
      wager,
      numPlayers,
      tokenDelta,
    });
    await storeUpdatedPlayer(tokenDelta);
  };

  useEffect(() => {
    if (!gameResult && !sim.simulationFinished) {
      runSimulation();
    } else if (!gameResult && sim.simulationFinished) {
      handleSimulationResult();
    }
  }, [gameResult, sim.simulationFinished]);

  const returnHome = () => {
    setTurtle({...turtle, points: undefined});
    setSim({...sim, simulationStarted: false, simulationFinished: false});
    setPlayers({..._players, players: undefined, playerIdx: undefined});
    navigation.navigate('Home', {
      player: {
        ...route.params.player,
        tokens: route.params.player.tokens + gameResult!.tokenDelta,
      },
      gameHistory: [...route.params.gameHistory, gameResult!],
    });
  };

  const roundFloat = (n: number) => Math.round(n * 100) / 100;
  const pluralize = (n: number, s: string) => (n === 1 ? s : s + 's');
  const gameOverText = (
    <Heading>
      {gameResult ? (
        <>
          {`You ${gameResult.tokenDelta > 0 ? 'won' : 'lost'} `}
          <Text color={tokenColor}>
            {Math.abs(roundFloat(gameResult.tokenDelta))}
          </Text>
          {`${pluralize(
            Math.abs(roundFloat(gameResult.tokenDelta)),
            ' token',
          )}${gameResult.tokenDelta > 0 ? '!' : '.'}`}
        </>
      ) : (
        ' '
      )}
    </Heading>
  );

  return (
    <Center
      flex={1}
      pb={10}
      px={5}
      bg={backgroundColor}
      alignItems="center"
      justifyContent="space-between"
      safeArea>
      <StatusBar barStyle="light-content" />
      <IconButton
        mr="auto"
        key="arena-back-button"
        icon={
          <ArrowBackIcon
            color={
              gameResult ? theme.colors.primary[400] : theme.colors.gray[400]
            }
          />
        }
        onPress={returnHome}
        disabled={!gameResult}
      />
      <Simulation />
      {gameOverText}
    </Center>
  );
};

export default Arena;
