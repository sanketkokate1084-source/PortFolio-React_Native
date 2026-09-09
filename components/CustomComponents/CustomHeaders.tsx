import React from 'react';
import {Text, View, useColorScheme} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {JSX} from 'react/jsx-runtime';
import {LinearGradient} from 'expo-linear-gradient';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import {ThemeToggle} from './ThemeToggle/ThemeToggle';
import ThemedView from './ThemedView/ThemedView';
import ThemedText from './ThemedText/ThemedText';

export const CUSTOM_HEADER_HEIGHT = 60;

export const CustomAppHeader = (props:any): JSX.Element => {
  const insets = useSafeAreaInsets();  
  const colorScheme = useColorScheme();
  return (
    <View 
      style={{height: CUSTOM_HEADER_HEIGHT + insets.top,
        overflow:'hidden',
      }}
    >
      <LinearGradient
        className={'w-full h-full px-2 items-center flex-row  justify-between  '}
        colors={colorScheme === 'dark' ? ['black', '#ab75d7'] : ['white', '#ab75d7']}
        start={{x:1, y:1}}
        style={{paddingTop:insets.top}}
        end={{x:0, y:0}}
      >
        <Animated.View 
          style={
            {marginLeft : 20}
          }
          entering={FadeInUp.duration(500)}
          exiting={FadeOutUp.duration(500)}
        >
          <Text className={'text-[30px] text-foreground font-bold '}>{props?.options?.title || props?.route?.name }</Text>
        </Animated.View>
        <ThemedView className={'bg-transparent'}>
          <ThemeToggle />
        </ThemedView>
      </LinearGradient>
    </View>
  );
};
