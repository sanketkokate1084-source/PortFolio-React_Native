import ThemedText from '@/components/CustomComponents/ThemedText/ThemedText';
import ThemedView from '@/components/CustomComponents/ThemedView/ThemedView';
import {web} from '@/utilities/CommonFunctions';
import {getShadow, styleMerge} from '@/utilities/Styling';
import {HomeScreenData} from '@/assets/data/HomeScreen';
import React from 'react';
import {Icon} from '@/components/ui/icon';
import {Appearance, View} from 'react-native';

const {intro, features, outro} = HomeScreenData.aboutMe;

const HomeScreenAppInfo = () => {
  
  return (
    <ThemedView className={styleMerge('w-full  bg-background-dark rounded-xl transition-all duration-300')}
      style = {getShadow('lg')}
    >
      <ThemedView className={styleMerge('bg-transparent p-2 m-2' )}>
        <ThemedText className={styleMerge('font-saira-stencil-semibold text-start text-3xl transition-all duration-300', (web ? 'text-[45px] text-center' : ''))}>ABOUT ME...!</ThemedText>
        <ThemedText className={styleMerge('font-nunito-medium  text-left text-lg ')}>{intro}</ThemedText>
        {
          features.map((feature, index)=>{
            return(
              <View className={styleMerge('flex-row gap-2 items-center py-1', (web ? 'w-full' : ''))} key={index}>
                <Icon  as={feature.icon} className={styleMerge('w-6 h-6 object-fill  ', feature.color)} />
                <ThemedText className={styleMerge('font-nunito-bold  text-left text-lg ')}>{feature.label}</ThemedText>
              </View>
            );
          })
        }
        <ThemedText className={styleMerge('font-nunito-medium  text-left text-lg m-5')}>{outro}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default HomeScreenAppInfo;
