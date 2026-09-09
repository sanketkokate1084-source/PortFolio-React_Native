import Drawer from 'expo-router/drawer';
import {Box} from '@/components/ui/box';
import {styleMerge} from '@/utilities/Styling';
import HomeScreenWebInfo from './(info)/HomeScreenWebInfo';
import HomeScreenAppInfo from './(info)/HomeScreenAppInfo';
import HomeScreenHeader from './HomeScreenHeader';
import {web} from '@/utilities/CommonFunctions';
import HomeScreenFooter from './HomeScreenFooter';
import ThemedView from '@/components/CustomComponents/ThemedView/ThemedView';
import ThemedText from '@/components/CustomComponents/ThemedText/ThemedText';

const Homescreen= (): React.JSX.Element => {

  return (
    <>
      <Drawer.Screen options={  {title: 'PoRtFoLio'}} />
      <ThemedView className={styleMerge('lg:w-4/5 bg-background w-full self-center android:w-full h-full  gap-5 ')}>
        <HomeScreenHeader />
        {web ? 
          <HomeScreenWebInfo />
          : (
            <>
              <HomeScreenAppInfo />
            </>
          )}
        <HomeScreenFooter />
        
      </ThemedView>
    </>

  );
};

export default Homescreen;
