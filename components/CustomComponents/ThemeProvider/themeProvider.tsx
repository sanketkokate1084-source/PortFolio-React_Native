// ThemeProviderWrapper.tsx
import {useSelector} from 'react-redux';
import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider';
import {JSX} from 'react/jsx-runtime';
import {selectPreferrence} from '@/redux/selectors/selectors';

export const ThemeProviderWrapper = ({children}: {children: JSX.Element}): JSX.Element => {
  // Properly subscribes to Redux changes
  const preferrences = useSelector(selectPreferrence );
  const preferredTheme = preferrences?.settings?.theme;

  return (
    <GluestackUIProvider mode={preferredTheme}>
      {children}
    </GluestackUIProvider>
  );
};
