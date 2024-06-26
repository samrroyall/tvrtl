import {theme} from 'native-base';
import {atom} from 'recoil';

interface GameAtom {
  isLoading: boolean;
  labelFontColor: string;
  labelFontSize: number;
  labelFontWeight: number;
  labelOutlineFill: string;
  labelOutlineFillActive: string;
  labelSize: number;
  lineWeight: number;
  padding: number;
  polygonFill: string;
  polygonStroke: string;
  polygonLineStroke: string;
  polygonVertexStroke: string;
  polygonVertexFill: string;
  showBoardLines: boolean;
  showBoardVertices: boolean;
  showCircle: boolean;
  showGrid: boolean;
  showLabelText: boolean;
  simulationStarted: boolean;
  simulationFinished: boolean;
  simulationStepDuration: number;
  simulationSteps: number;
  size: number;
}

export const gameAtom = atom<GameAtom>({
  key: 'gameAtom',
  default: {
    isLoading: false,
    labelFontColor: theme.colors.gray[800],
    labelFontSize: 10,
    labelFontWeight: 100,
    labelOutlineFill: theme.colors.primary[400],
    labelOutlineFillActive: theme.colors.lime[200],
    labelSize: 14,
    lineWeight: 1,
    padding: 40,
    polygonFill: theme.colors.emerald[800],
    polygonStroke: theme.colors.emerald[600],
    polygonLineStroke: theme.colors.emerald[600],
    polygonVertexStroke: theme.colors.emerald[600],
    polygonVertexFill: theme.colors.coolGray[800],
    showBoardLines: true,
    showBoardVertices: true,
    showCircle: false,
    showGrid: false,
    showLabelText: false,
    simulationStarted: false,
    simulationFinished: false,
    simulationStepDuration: 300,
    simulationSteps: 200,
    size: 350,
  },
});
