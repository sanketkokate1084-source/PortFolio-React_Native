import React, {useEffect} from 'react';
import {Appearance, ColorSchemeName, View, ViewProps, useColorScheme} from 'react-native';
import {OverlayProvider} from '@gluestack-ui/core/overlay/creator';
import {ToastProvider} from '@gluestack-ui/core/toast/creator';
import {config} from './config';
import {VariableContextProvider} from 'nativewind';

export type ModeType = keyof typeof config | 'system';

export function GluestackUIProvider({
  mode = 'system',
  ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {

  const systemTheme = useColorScheme();
  useEffect(() => {
    if(mode === 'system'){
      Appearance.setColorScheme(null);
    }
    else{
      Appearance.setColorScheme(mode as ColorSchemeName);
    }
  }, [mode]);

  const activeMode : ModeType =  mode === 'system' ? systemTheme as ModeType : mode as ModeType;
  const activeTokens   = config[activeMode];

  return (
    <VariableContextProvider value = {activeTokens}>
      <View
        style={[
          {flex: 1, width: '100%'},
          activeTokens,
          props.style,
        ]}
      >
        <OverlayProvider>
          <ToastProvider>{props.children}</ToastProvider>
        </OverlayProvider>
      </View>
    </VariableContextProvider>
   
  );
}
