import ThemedView from '../ThemedView/ThemedView';
import {Pressable, View, useColorScheme} from 'react-native';
import {MaterialDesignIcons} from '@react-native-vector-icons/material-design-icons';
import {Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@/components/ui/modal';
import {CustomButton} from '../CustomButton';
import {useState} from 'react';
import ThemedText from '../ThemedText/ThemedText';
import {useDispatch} from 'react-redux';
import {addThemePreferrence} from '@/redux/slices/preferencesSlice';

export const ThemeToggle = ()=>{
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTheme = ()=>{ 
    dispatch(addThemePreferrence(colorScheme==='dark'?'light':'dark'));
  };

  return (
    <View>
      <Pressable onPress={()=>{
        toggleTheme();
        
      }}>
        <ThemedView   className={'flex-row w-full bg-transparent dark:bg-transparent border dark:border-border rounded-xl  p-0 items-center gap-3'}>
          <MaterialDesignIcons name={'theme-light-dark'} size={30} color={colorScheme==='dark'? 'white': 'black'}  />
        </ThemedView>
      </Pressable>
      <Modal isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false);}}>
        <ModalBackdrop />
        <ModalContent>
          <ModalBody>
            <ThemedText>What is </ThemedText>
          </ModalBody>
          <ModalFooter>
            <CustomButton buttonText={'Close'} onPress={()=>{setIsModalOpen(false);}} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>

  );
};
