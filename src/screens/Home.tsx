import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Input,
  Row,
  StatusBar,
  Text,
} from 'native-base';
import {FontAwesome5, Ionicons} from '@expo/vector-icons';
import {useRecoilValue} from 'recoil';
import {configAtom} from '../state/atoms';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../App';
import {GameResult, Player} from '../models';
import {
  handleLoadStorageError,
  loadStoredGameHistory,
  loadStoredPlayer,
} from '../helpers';
import GameHistory from '../components/GameHistory';

type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({navigation, route}) => {
  const {backgroundColor, titleColor, tokenColor, userColor} =
    useRecoilValue(configAtom);

  const [player, setPlayer] = useState<Player>(route.params.player);
  const [gameHistory, setGameHistory] = useState<GameResult[]>(
    route.params.gameHistory,
  );
  const [wager, setWager] = useState<number>(0);
  const [wagerIsValid, setWagerIsValid] = useState(false);

  useEffect(() => {
    loadStoredPlayer()
      .then(p => {
        if (p) {
          setPlayer(p);
        }
      })
      .catch(handleLoadStorageError);
    loadStoredGameHistory().then(setGameHistory).catch(handleLoadStorageError);
  }, []);

  const validateWager = (text: string) => {
    if (isNaN(parseFloat(text))) {
      setWagerIsValid(false);
      return;
    }

    // Decimals are allowed but only up to 2 decimal places
    const n = parseFloat(text);
    const parts = n.toString().split('.');
    if (parts.length > 1 && parts[1].length > 2) {
      setWagerIsValid(false);
    } else if (n <= 0 || n > player.tokens) {
      setWagerIsValid(false);
    } else {
      setWager(n);
      setWagerIsValid(true);
    }
  };

  const welcomeText = (
    <Box>
      <Heading mb={3}>
        Welcome, <Text color={userColor}>{player?.username}</Text>!
      </Heading>
      <Heading size="md" mb={3}>
        You currently have <Text color={tokenColor}>{player?.tokens}</Text>
        {' tokens.'}
      </Heading>
      <Heading size="md">
        Enter your wager below and join a room to start playing!
      </Heading>
    </Box>
  );

  const joinGameForm = (
    <Box w="100%">
      <Input
        mb={3}
        size="lg"
        _input={{selectionColor: 'white'}}
        placeholder="Enter your wager"
        keyboardType="numeric"
        onChangeText={validateWager}
        isInvalid={!wagerIsValid}
      />
      <Button
        p={2}
        size="lg"
        onPress={() =>
          navigation.navigate('Arena', {gameHistory, player, wager})
        }
        isDisabled={!wagerIsValid}>
        Join Room
      </Button>
    </Box>
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
      <Heading size="3xl" color={titleColor}>
        tvtrl
      </Heading>
      <Center w="100%">
        <Row w="100%" mb={8} justifyContent="space-between">
          <Row alignItems="center">
            <Icon
              key="user-icon"
              as={Ionicons}
              name="person"
              color={userColor}
            />
            <Heading size="sm" color={userColor} ml={1}>
              {player?.username}
            </Heading>
          </Row>
          <Row alignItems="center">
            <Icon
              key="tokens-icon"
              as={FontAwesome5}
              name="coins"
              color={tokenColor}
            />
            <Heading size="sm" color={tokenColor} ml={1}>
              {Math.round((player?.tokens || 0) * 100) / 100}
            </Heading>
          </Row>
        </Row>
        {gameHistory.length === 0 ? (
          welcomeText
        ) : (
          <GameHistory
            gameHistory={gameHistory}
            limit={5}
            navigationFunc={() =>
              navigation.navigate('FullGameHistory', {player, gameHistory})
            }
          />
        )}
      </Center>
      {joinGameForm}
    </Center>
  );
};

export default Home;
