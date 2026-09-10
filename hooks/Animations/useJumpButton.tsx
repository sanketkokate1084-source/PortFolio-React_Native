import {useAnimatedStyle, useSharedValue, withSequence, withTiming} from 'react-native-reanimated';

type JumpButtonAnimationParams = {
    duration?:number
    ScaleValue?:number
}

const useJumpButtonAnimation = ({duration=50, ScaleValue=1.2}:JumpButtonAnimationParams = {})=>{
  const Scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(()=>{
    return {
      transform:[{scale: Scale.value}],
    };
  });
  const buttonJump = ()=>{
    'worklet';
    Scale.value = withSequence(withTiming(ScaleValue, {duration: duration}), withTiming(1, {duration: duration}));
  };
  return {jumpButtonAnimatedStyle: animatedStyle, buttonJump};
};

export {useJumpButtonAnimation};
