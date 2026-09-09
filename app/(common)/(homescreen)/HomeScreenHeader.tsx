
import {Image, View, useWindowDimensions} from 'react-native';
import React from 'react';

import Animated, {FadeInRight}  from 'react-native-reanimated';
import {web} from '@/utilities/CommonFunctions';
import {getShadow, styleMerge} from '@/utilities/Styling';
import {Box} from '@/components/ui/box';
import ThemedView from '@/components/CustomComponents/ThemedView/ThemedView';
import ThemedText from '@/components/CustomComponents/ThemedText/ThemedText';
import {useCopyToClipboard} from '@/hooks/copyToClipboard';
import {Icon} from '@/components/ui/icon';
import {MailCheck} from 'lucide-react-native';
import {useSlideAndOscillate} from '@/hooks/Animations/useSlideAndOscillate';

const HomeScreenHeader = () => {

  const {width} = useWindowDimensions();
  const {copyToClipboard} = useCopyToClipboard();
  const imageFloatingAnimation  = useSlideAndOscillate();
  
  return (
    <ThemedView className={styleMerge('w-full  h-[400px] lg:h-[500px]  android:h-[400px] flex items-center justify-center rounded-md bg-background-dark transition-all duration-300' )}
      style = {getShadow('lg')}
    >
      <Box className={styleMerge('w-full  flex flex-row  items-center justify-center android:flex-col gap-20 android:gap-5 ', (width <800 ? 'flex-col gap-5' : ''))}>
        
        <Animated.View 
          style={[imageFloatingAnimation, {
            height:(web ? (width< 1200 ? 200 : 400):  280),
            width:(web ? (width< 1200 ? 200 : 400):  280),
            borderRadius: '100%',
          }, getShadow('2xl')]}
        >
          <Image
            className={styleMerge('rounded-full ')}
            source={require('@/assets/images/SelfImage.png')}
            alt={'My Image'}
            style={[{
              height:'100%',
              width:'100%',
            }]}
          />
        </Animated.View>
       
        <Animated.View entering={FadeInRight.duration(500)} className={styleMerge('  items-center justify-center', (web ? 'h-full w-1/3': 'w-full'))}> 
          <ThemedText className={styleMerge('font-bitcount-medium ', (web ? 'text-white text-[60px]': 'text-foreground text-[40px] w-full'))}>Sanket Kokate</ThemedText>

          <View className={' flex flex-row w-full justify-center   items-center gap-4'}>
            <Icon as={MailCheck} size={width<800? 'sm' : 'lg'} className={'mt-1'} />
            <ThemedText className={styleMerge('text-green-800  text-xl font-semibold', (web ? '': ''))} onPress={()=>{
              copyToClipboard('sanketkokate1084@gmail.com');
            }}>sanketkokate1084@gmail.com</ThemedText>
          </View>
        </Animated.View>
          
      </Box>
    </ThemedView>
  );
};

export default HomeScreenHeader;
