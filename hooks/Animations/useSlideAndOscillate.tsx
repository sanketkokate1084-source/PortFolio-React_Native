import {useEffect} from 'react';
import {cancelAnimation, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming} from 'react-native-reanimated';

export const useSlideAndOscillate = (
  startX : number =-500,
  oscillationOffset: number = 10,
  slideDuration : number= 2000,
  oscillationDuration: number = 1000,
) =>{
  const translateX = useSharedValue(startX);
  const translateY = useSharedValue(0);

  useEffect(()=>{
    const oscillate = (finished?:boolean)=>{
      'worklet';
      if(!finished){
        return false;
      }
      translateX.value = withSequence(
        withTiming(oscillationOffset, {duration :2*oscillationDuration}), 
        withRepeat(
          withTiming(-oscillationOffset, {duration: 3*oscillationDuration}), -1, true),
      );
      translateY.value = withSequence(
        withTiming(oscillationOffset, {duration :oscillationDuration}),
        withRepeat(
          withTiming(-oscillationOffset, {duration: 1.5*oscillationDuration}), -1, true),
      );
    };
    translateX.value = withSpring(0, {
      duration: slideDuration,
      dampingRatio:0.6,
    });
    return ()=>{
      cancelAnimation(translateX);
      cancelAnimation(translateY);
    };
  }, []);
  return useAnimatedStyle(()=>{
    return {
      transform : [
        {translateX : translateX.value},
        {translateY : translateY.value},
      ],
    };
  }); 
};
