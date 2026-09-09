import {Text, View} from 'react-native';
import React from 'react';
import {Stack} from 'expo-router';
import ThemedView from '@/components/CustomComponents/ThemedView/ThemedView';
import ThemedText from '@/components/CustomComponents/ThemedText/ThemedText';

const NotFoundPage = () => {
  return (
    <>
      <Stack.Screen options={{title: 'Page Not Found'}} />
      <ThemedView className={'justify-center items-center w-full h-full '}>
        <ThemedText className={'text-center text-3xl'}> Oops! Looks like it leads to nowhere, You should go back.</ThemedText>
      </ThemedView>
    </>

  );
};

export default NotFoundPage;
