import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../App';
import {ArrowBackIcon, Center, IconButton, StatusBar, theme} from 'native-base';
import {configAtom} from '../state/atoms';
import {useRecoilValue} from 'recoil';
import GameHistory from '../components/GameHistory';

type FullGameHistoryProps = NativeStackScreenProps<
  StackParamList,
  'FullGameHistory'
>;

const FullGameHistory: React.FC<FullGameHistoryProps> = ({
  navigation,
  route,
}) => {
  const {backgroundColor} = useRecoilValue(configAtom);
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
        key="game-history-back-button"
        mr="auto"
        icon={<ArrowBackIcon color={theme.colors.primary[400]} />}
        onPress={() =>
          navigation.navigate('Home', {
            player: route.params.player,
            gameHistory: route.params.gameHistory,
          })
        }
      />
      <GameHistory gameHistory={route.params.gameHistory} />
    </Center>
  );
};

export default FullGameHistory;
