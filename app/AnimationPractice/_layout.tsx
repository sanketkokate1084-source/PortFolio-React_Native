import {Stack} from 'expo-router';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AnimationLayout = ()=>{
  const insets = useSafeAreaInsets();
  return (
    <Stack screenOptions={{
      headerShown:false,
      
    }} />
  );
};

export default AnimationLayout;
