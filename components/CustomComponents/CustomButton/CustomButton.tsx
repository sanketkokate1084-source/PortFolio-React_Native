import React from 'react';
import {Pressable, PressableProps, Text} from 'react-native';
import {Spinner} from '@/components/ui/spinner';
import {styleMerge} from '@/utilities/Styling';
import {RelativePathString, useRouter} from 'expo-router';
import ThemedText from '../ThemedText/ThemedText';

type CustomButtonProps = PressableProps & {
  buttonText?: string | (() => React.ReactNode);
  buttonStyle?: string;
  textStyle?: string;
  onPress?: () => void;
  icon?: React.ComponentType | null;
  containerCssStyle?:object;
  loading?: boolean;
  disabled?: boolean;
  capitalised?: boolean;
  spinnerSize?: number | null;
  spinnerColour?: string | null;   
  destination?: RelativePathString | '' | string;
};

const CustomButton = ({
  buttonText = 'Proceed',
  buttonStyle = '',
  textStyle = '',
  onPress = () => {},
  icon: IconComponent = null,   
  loading = false,
  disabled = false,
  capitalised = true,
  spinnerSize=null,
  containerCssStyle={},
  spinnerColour='',
  destination='',
  ...others
}: CustomButtonProps) => {
  let router = null;
  if(destination){
    router = useRouter();
  }
  return (
    <Pressable
      {...others}
      disabled={disabled || loading}
      onPress={destination ? ()=> router?.push(destination) : onPress}
      className={styleMerge(
        'group flex-row items-center justify-evenly bg-primary rounded-lg active:opacity-80 py-1 px-2',
        (disabled || loading) ? 'opacity-50' : '',
        buttonStyle,
      )}
      style={[ containerCssStyle]}
    >
      {loading && (
        <Spinner size={spinnerSize || 30} color={spinnerColour || 'white'}  />
      )}
 
      {!loading && IconComponent && (typeof(IconComponent) === 'function' ? (<IconComponent />) : IconComponent)}

      {!loading && buttonText && (typeof(buttonText) === 'function'? buttonText() : (
        <ThemedText
          className={styleMerge('text-primary-foreground', textStyle)}
        >
          {capitalised ? buttonText.toUpperCase() : buttonText}
        </ThemedText>
      ) )}
    </Pressable>
  );
};

export {CustomButton};
