import '@/global.css';
import {SplashScreen, Stack} from 'expo-router';
import {useWindowDimensions} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {CustomAppHeader} from '@/components/CustomComponents';
import {useFonts} from 'expo-font';
import React, {useEffect} from 'react';
import {configureReanimatedLogger} from 'react-native-reanimated';
import {Provider} from 'react-redux';
import store, {persistor} from '@/redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProviderWrapper} from '@/components/CustomComponents/ThemeProvider/themeProvider';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

configureReanimatedLogger({
  strict: false,
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
  });

  const insets = useSafeAreaInsets();

  useEffect(()=>{
    if(fontsLoaded || fontError){
      SplashScreen.hideAsync();
    }
    if(fontError){
    }
    if(fontsLoaded){
    }

  }, [fontsLoaded, fontError]);
  
  if (!fontsLoaded && !fontError) {
    return null; // The SplashScreen remains visible while returning null
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar  animated style={'auto'} />
          <ThemeProviderWrapper>
            <SafeAreaView style={{flex:1}} edges={[ 'left', 'right']}>

              <Stack
                screenOptions={
                  {
                    header:props=>{
                      return (
                        <CustomAppHeader {...props} />
                      );
                    },
                  }
                }
              >
              </Stack>
            </SafeAreaView>
          </ThemeProviderWrapper>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>

  );
}
