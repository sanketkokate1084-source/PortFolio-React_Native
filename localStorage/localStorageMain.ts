
import {createMMKV} from 'react-native-mmkv';

const mainStorage = createMMKV({
  id: 'Public_MMKV_Storage',
});

export const fetchKey = (key: string) => {
  return mainStorage.getString(key);
};

export const storeKey = (key: string, value: string) => {
  return mainStorage.set(key, value);
};
 
export const deleteKey = (key: string) => {
  return mainStorage.remove(key);
};

export const clearAll = () => {
  return mainStorage.clearAll();
};

export const reduxPersistStorage = {
  setItem :(key:any, val:any)=>{
    try{
      mainStorage.set(key, val);
      return Promise.resolve(true);
    }
    catch(error){
      console.error(error);
      return Promise.reject(false);
    }
  }, 
  getItem: (key: any)=>{
    try{
      const value = mainStorage.getString(key);
      return Promise.resolve(value);
    }
    catch(error){
      console.error(error);
      return Promise.reject(false);
    }
  },

  removeItem: (key: any)=>{
    try{
      mainStorage.remove(key);
      return Promise.resolve(true);
    }
    catch(error){
      console.error(error);
      return Promise.reject(false);
    }
  },
};
