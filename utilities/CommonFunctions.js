import {usePathname, useSegments} from 'expo-router';
import {useEffect} from 'react';
import {Platform} from 'react-native';

export const web =  Platform.OS === 'web';

export function useRouteLogger() {
  const pathname = usePathname();
  const segments = useSegments();

  useEffect(() => {
    console.log('[Route]', {pathname, segments});
  }, [pathname, segments]);
}
