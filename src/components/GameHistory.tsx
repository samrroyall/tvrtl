import React from 'react';
import {Box, Divider, Icon, Row, ScrollView, Text, theme} from 'native-base';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {GameResult} from '../models';

interface GameHistoryProps {
  gameHistory: GameResult[];
  limit?: number;
  navigationFunc?: () => void;
}

const GameHistory: React.FC<GameHistoryProps> = ({
  gameHistory,
  limit,
  navigationFunc,
}) => {
  return (
    <ScrollView w="100%">
      <Row justifyContent="space-between">
        <Text w="30%" textAlign="center" bold>
          Wager
        </Text>
        <Text w="30%" textAlign="center" bold>
          # of Players
        </Text>
        <Text w="30%" textAlign="center" bold>
          Token Δ
        </Text>
      </Row>
      <Divider my={2} bg={theme.colors.white} />
      {limit !== undefined && limit < gameHistory.length ? (
        <>
          <Icon
            as={MaterialCommunityIcons}
            name="dots-vertical"
            mx="auto"
            mb={1}
            size="md"
            color={theme.colors.coolGray[600]}
          />
          <Divider bg={theme.colors.coolGray[600]} />
        </>
      ) : null}
      {(limit !== undefined && gameHistory.length > limit
        ? gameHistory.slice(gameHistory.length - limit)
        : gameHistory
      ).map((game, i) => (
        <Box key={`row-${i}`} w="100%">
          {i === 0 ? null : <Divider bg={theme.colors.coolGray[600]} />}
          <Row justifyContent="space-between">
            <Text w="30%" textAlign="center">
              {game.wager}
            </Text>
            <Text w="30%" textAlign="center">
              {game.numPlayers}
            </Text>
            <Text
              w="30%"
              color={
                game.tokenDelta < 0
                  ? theme.colors.red[400]
                  : theme.colors.green[400]
              }
              textAlign="center">
              {Math.round(game.tokenDelta * 100) / 100}
            </Text>
          </Row>
        </Box>
      ))}
      {limit !== undefined && limit < gameHistory.length ? (
        <>
          <Divider bg={theme.colors.coolGray[600]} />
          <Row justifyContent="center">
            <Text
              mt={2}
              color={theme.colors.coolGray[500]}
              fontWeight={500}
              onPress={() => (navigationFunc ? navigationFunc() : {})}>
              See Full History
            </Text>
          </Row>
        </>
      ) : null}
    </ScrollView>
  );
};

export default GameHistory;
