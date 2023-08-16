import {atom} from 'recoil';

interface ConfigAtom {
  mockDelay: number;
  useMock: boolean;
}

export const configAtom = atom<ConfigAtom>({
  key: 'configAtom',
  default: {
    mockDelay: 300,
    useMock: true,
  },
});
