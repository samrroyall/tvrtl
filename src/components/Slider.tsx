import React from 'react';
import {
  FormControl,
  HStack,
  ISliderProps,
  Slider as _Slider,
  Stack,
  Text,
} from 'native-base';

interface SliderProps extends ISliderProps {
  label: string;
  value: any;
  w?: string | number;
}

const Slider: React.FC<SliderProps> = ({label, w, value, ...props}) => {
  return (
    <Stack w={w || '100%'}>
      <HStack justifyContent="space-between" alignItems="center">
        <FormControl.Label>
          <Text bold>{label}:</Text>
        </FormControl.Label>
        <FormControl.HelperText>
          <Text mt={-1}>{value}</Text>
        </FormControl.HelperText>
      </HStack>
      <_Slider {...props}>
        <_Slider.Track>
          <_Slider.FilledTrack />
        </_Slider.Track>
        <_Slider.Thumb />
      </_Slider>
    </Stack>
  );
};

export default Slider;