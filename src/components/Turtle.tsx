import React, {forwardRef, useEffect, useMemo, useRef} from 'react';
import {Animated, Easing, View} from 'react-native';
import Svg, {Path, Polygon} from 'react-native-svg';
import {useRecoilState, useRecoilValue} from 'recoil';
import {getTangentAngle} from '../helpers';
import G from './G';
import {gameAtom, turtleAtom} from '../state/atoms';
import {gameSelector, motionSelector} from '../state/selectors';
import {Point} from '../models';

const Turtle = forwardRef<View, {size: number; scale: number; fill: string}>(
  (props, ref) => (
    <View ref={ref} style={{height: props.size, width: props.size}}>
      <Svg height={props.size} width={props.size}>
        <G scale={props.scale} fill={props.fill}>
          <Path d="M127.088,141.809l-36.345-50.03c-10.148,8.759-18.831,19.169-25.586,30.845H60c-33.138,0-60,26.863-60,60h49.1 c0,9.446,1.098,18.634,3.161,27.451l58.864-19.127L127.088,141.809z" />
          <Path d="M194.916,130.062v-0.001l36.354-50.055c-6.963-4.227-14.374-7.788-22.17-10.544V42.624c0-22.091-17.908-40-40-40 c-22.092,0-40,17.909-40,40v26.838c-7.797,2.756-15.209,6.318-22.172,10.545l36.354,50.054H194.916z" />
          <Path d="M58.44,229.109c4.555,10.831,10.649,20.854,18.017,29.792c-14.349,25.382-8.402,58.125,15.238,76.673l32.629-41.589 c10.891,4.383,22.571,7.21,34.769,8.219l0.004-61.827l-41.823-30.392L58.44,229.109z" />
          <Path d="M278.199,122.624h-5.157c-6.755-11.676-15.439-22.086-25.587-30.846l-36.344,50.029l15.963,49.14l58.864,19.126 c2.063-8.816,3.161-18.004,3.161-27.449h49.1C338.199,149.487,311.337,122.624,278.199,122.624z" />
          <Path d="M220.926,209.984l-41.822,30.391l0.005,61.828c12.196-1.009,23.877-3.836,34.767-8.219l32.629,41.589 c23.641-18.548,29.588-51.29,15.238-76.673c7.367-8.937,13.462-18.961,18.017-29.791L220.926,209.984z" />
          <Polygon points="192.764,150.06 145.436,150.06 130.807,195.096 169.1,222.922 207.393,195.096" />
        </G>
      </Svg>
    </View>
  ),
);

const TurtleWrapper = forwardRef<
  View,
  {
    fill: string;
    scale: number;
    size: number;
    innerRef: React.ForwardedRef<View>;
  }
>((props, ref) => (
  <View ref={ref}>
    <Turtle
      ref={props.innerRef}
      fill={props.fill}
      scale={props.scale}
      size={props.size}
    />
  </View>
));

const AnimatedTurtle: React.FC<{}> = () => {
  const [game, setGame] = useRecoilState(gameAtom);
  const {boardPoints, offset, origin} = useRecoilValue(gameSelector);
  const {line, curve, splinePoints, tangentPoints} =
    useRecoilValue(motionSelector);
  const turtle = useRecoilValue(turtleAtom);

  const turtleRef = useRef<View>(null);
  const turtleWrapperRef = useRef<View>(null);

  // turtle position state and listener
  const pos = useMemo<Animated.ValueXY>(() => new Animated.ValueXY(), []);
  pos.addListener(({x, y}) => {
    if (turtleWrapperRef.current) {
      turtleWrapperRef.current.setNativeProps({
        left: x + offset[0] - turtle.size / 2,
        top: y + offset[1] - turtle.size / 2,
      });
    }
  });
  // turtle rotation state and listener
  const rot = useMemo<Animated.Value>(() => new Animated.Value(0), []);
  rot.addListener(({value}) => {
    if (turtleRef.current) {
      turtleRef.current.setNativeProps({
        transform: [{rotateZ: `${value + Math.PI / 2}rad`}],
      });
    }
  });

  useEffect(() => {
    if (!turtle.points) {
      pos.setValue({x: origin[0], y: origin[1]});
      rot.setValue(-Math.PI / 2);
    }
  }, [origin, pos, rot, turtle.points]);

  useEffect(() => {
    const turtleCallback = (
      _splinePoints: Point[],
      _tangentPoints: Point[],
      _pos: Animated.ValueXY,
      _rot: Animated.Value,
    ): void => {
      const animation = Animated.sequence(
        [...Array(_splinePoints.length).keys()].map(i =>
          Animated.parallel([
            Animated.timing(_pos, {
              toValue: {x: _splinePoints[i][0], y: _splinePoints[i][1]},
              easing: Easing.linear,
              duration: game.simulationStepDuration,
              useNativeDriver: true,
            }),
            Animated.timing(_rot, {
              toValue: getTangentAngle(_tangentPoints[i]),
              easing: Easing.linear,
              duration: game.simulationStepDuration,
              useNativeDriver: true,
            }),
          ]),
        ),
      );
      animation.start(() => setGame({...game, simulationFinished: true}));
    };

    // When splinePoints change, animate turtle
    if (splinePoints && tangentPoints && !game.simulationFinished) {
      turtleCallback(splinePoints, tangentPoints, pos, rot);
    }
  }, [game, pos, rot, setGame, splinePoints, tangentPoints]);

  const originalSize = 338.199;
  const turtleWrapper = (
    <TurtleWrapper
      ref={turtleWrapperRef}
      innerRef={turtleRef}
      size={turtle.size}
      scale={turtle.size / originalSize}
      fill={turtle.fill}
    />
  );

  const curvePath = (
    <Path
      d={curve || ''}
      stroke={turtle.curveStroke}
      strokeWidth={game.lineWeight}
    />
  );

  const linePath = (
    <Path
      d={line || ''}
      stroke={turtle.lineStroke}
      strokeWidth={game.lineWeight}
    />
  );

  return (
    <G>
      {boardPoints ? turtleWrapper : null}
      {turtle.showCurve ? curvePath : null}
      {turtle.showLine ? linePath : null}
    </G>
  );
};

export default AnimatedTurtle;
