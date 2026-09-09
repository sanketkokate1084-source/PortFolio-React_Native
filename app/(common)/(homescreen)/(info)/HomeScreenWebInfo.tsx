import ThemedText from '@/components/CustomComponents/ThemedText/ThemedText';
import ThemedView from '@/components/CustomComponents/ThemedView/ThemedView';
import {getShadow, styleMerge} from '@/utilities/Styling';
import {HomeScreenData} from '@/assets/data/HomeScreen';
import React from 'react';
import {Icon} from '@/components/ui/icon';
import {View, useWindowDimensions} from 'react-native';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';
import {useInView} from '@/hooks/inView';

const {intro, features, outro} = HomeScreenData.aboutMe;

const HomeScreenWebInfo = () => {

  return (
    <ThemedView className={styleMerge('w-full bg-tertiary-100 rounded-xl p-5 hover:scale-[101%] transition-all duration-200')}
      style = {getShadow('lg')}
    >
      <ThemedText className={styleMerge('font-saira-stencil-semibold  text-3xl text-[45px] text-left')}>ABOUT ME...!</ThemedText>
      <ThemedText className={styleMerge('font-nunito-medium  text-left  pb-5')}>{intro}</ThemedText>
      <View className={'flex flex-row flex-wrap items-center justify-evenly w-full gap-5'}>
        {features.map((feature, index) => (
          <FeatureCard feature={feature} index={index} key={index} />
        ))}
      </View>
      <ThemedText className={styleMerge('font-nunito-medium  text-left  m-5')}>{outro}</ThemedText>
    </ThemedView>
  );
};

const FeatureCard = ({feature, index}: {feature: {icon: any; label: string; color: string}; index: number}) => {
  const {ref, inView} = useInView();
  const {width} = useWindowDimensions();

  return (
    <div ref={ref} style={{width: '20%'}}>
      {inView && (
        <Animated.View 
          entering={FadeInDown.delay(index * 100).duration(500)}
        >
          <View className={styleMerge(' w-full h-32  flex flex-col items-center justify-center border border-secondary-700 rounded-xl bg-secondary-100 hover:scale-105 transition-all duration-500 overflow-hidden')}
            style = {getShadow('lg')}
          >
            <Icon as={feature.icon} size={width/40} className={styleMerge(feature.color)} />
            <ThemedText className={styleMerge('h-1/3 text-center font-nunito-bold ')}>{feature.label}</ThemedText>
          </View>
        </Animated.View>
      )}
    </div>
  );
};

export default HomeScreenWebInfo;
