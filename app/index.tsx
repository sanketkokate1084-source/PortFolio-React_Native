import {JSX} from 'react/jsx-runtime';
import Homescreen from './(common)/(homescreen)/HomeScreen';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {selectRoot} from '@/redux/selectors/selectors';
import {Stack} from 'expo-router';

const Index = ():JSX.Element => {

  return (
    <ScrollView style={{flex:1}}>
      <Homescreen />
    </ScrollView>
    
  );
};

export default Index;
