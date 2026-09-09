import {styleMerge} from '@/utilities/Styling';
import {View, ViewProps} from 'react-native';

type ThemedViewProps = ViewProps & {
  className? : string
}

const ThemedView = ({className='', ...rest}: ThemedViewProps) => {
  return (
    <View className={styleMerge('bg-background ', className)} {...rest} />
  );
};

export default ThemedView;
