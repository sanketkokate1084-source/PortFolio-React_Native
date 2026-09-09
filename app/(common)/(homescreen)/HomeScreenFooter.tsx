import React from 'react';
import ThemedView from '@/components/CustomComponents/ThemedView/ThemedView';
import {styleMerge} from '@/utilities/Styling';
import {CustomButton} from '@/components/CustomComponents';
import {ArrowRight} from 'lucide-react-native';
import {web} from '@/utilities/CommonFunctions';
import {Icon} from '@/components/ui/icon';

const HomeScreenFooter = () => {
  return (
    <ThemedView className={styleMerge('w-full justify-center items-center h-16 hover:scale-[101%] transition-all px-10 duration-200')}>
      <CustomButton
        buttonText={'Checkout my creations'}
        textStyle={'text-xl font-bold'}
        icon={web? null : (()=> <Icon  as={ArrowRight} className={'text-foreground border-border bg-background-dark p-6 rounded-xl'} size={'2xl'}  />)}
        buttonStyle={styleMerge('h-16 ', (web? 'w-[50%]' : 'w-full'))}
        destination={'/DSA'}
      />
    </ThemedView>
  );
};

export default HomeScreenFooter;
