import {CustomButton} from '@/components/CustomComponents';
import ThemedView from '@/components/CustomComponents/ThemedView/ThemedView';
import {getShadow, styleMerge} from '@/utilities/Styling';
import {Stack} from 'expo-router';
import React from 'react';

const Index = () => {

  const list = [
    {key: 'Rank of Matrix Calculator', value: '/DSA/Matrix'},
  ];
  return (
    <ThemedView 
      style={{
        flex: 1,
      }}
      className={'w-full h-full bg-background gap-3 transition-all duration-300 p-5'}
    >
      <Stack.Screen options={{title: 'My Doings'}} />
      {/* <Stack.Screen options={{title: 'DSA'}} /> */}
      {list.map((item, index) => (
        <ThemedView 
          key={index} 
          className={styleMerge('w-full  h-32 justify-center items-center bg-primary rounded-xl  border-2 border-border')}
          style={ getShadow('lg')}
        >
          <CustomButton
            buttonStyle={'w-full h-full border-border rounded-none bg-primary rounded-xl '}
            destination={item?.value}
            buttonText={item?.key}
            textStyle={'text-primary-foreground text-2xl'}
          />
        </ThemedView>
      ))}
    </ThemedView>
  );
};

export default Index;
