import React, {useEffect, useState} from 'react';
import {Box, Button, Center, Heading, Input, StatusBar} from 'native-base';
import {StackParamList} from '../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import uuid from 'react-native-uuid';
import storage from '../state/storage';
import {useRecoilValue} from 'recoil';
import {configAtom} from '../state/atoms';
import {
  handleSaveStorageError,
  loadStoredGameHistory,
  loadStoredPlayer,
} from '../helpers';

type SignInProps = NativeStackScreenProps<StackParamList, 'SignIn'>;

const SignIn: React.FC<SignInProps> = ({navigation}) => {
  const {backgroundColor, initialTokens, titleColor} =
    useRecoilValue(configAtom);

  const [username, setUsername] = useState<string>('');
  const [usernameIsValid, setUsernameIsValid] = useState(false);

  const validateUsername = (text: string): void => {
    setUsernameIsValid(text.length > 3);
  };

  const loadStoredData = async () => {
    const gameHistory = await loadStoredGameHistory();
    const player = await loadStoredPlayer();
    if (player) {
      navigation.navigate('Home', {player, gameHistory});
    }
  };

  useEffect(() => {
    loadStoredData();
  }, []);

  const storePlayer = () => {
    const player = {
      uuid: uuid.v4() as string,
      username,
      tokens: initialTokens,
    };
    storage
      .save({key: 'player', data: player})
      .then(_ =>
        storage
          .save({key: 'gameHistory', data: []})
          .then(_ => navigation.navigate('Home', {player, gameHistory: []}))
          .catch(handleSaveStorageError),
      )
      .catch(handleSaveStorageError);
  };

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
      <Heading size="lg" textAlign="center">
        Welcome! Create your username below and get ready to play.
      </Heading>
      <Box w="100%">
        <Input
          mb={3}
          size="lg"
          _input={{selectionColor: 'white'}}
          placeholder="Enter your username"
          value={username}
          onChangeText={(text: string) => {
            setUsername(text);
            validateUsername(text);
          }}
          isInvalid={!usernameIsValid}
        />
        <Button
          p={2}
          size="lg"
          onPress={storePlayer}
          isDisabled={!usernameIsValid}>
          Create User
        </Button>
      </Box>
    </Center>
  );
};

export default SignIn;
