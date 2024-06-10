import {theme} from 'native-base';
import {atom} from 'recoil';

interface ConfigAtom {
  backgroundColor: string;
  initialTokens: number;
  mockDelay: number;
  titleColor: string;
  tokenColor: string;
  useMock: boolean;
  userColor: string;
}

export const configAtom = atom<ConfigAtom>({
  key: 'configAtom',
  default: {
    backgroundColor: theme.colors.coolGray[800],
    initialTokens: 50,
    mockDelay: 300,
    titleColor: theme.colors.lime[200],
    tokenColor: theme.colors.yellow[200],
    useMock: true,
    userColor: theme.colors.primary[400],
  },
});
