import {useCallback, useState} from 'react';
import * as ClipBoard from 'expo-clipboard';

const useCopyToClipboard = ()=>{
  const [isCopied, setIsCopied] =  useState(false) ;
  const copyToClipboard = async(text : string)=>{
    try { 
      await ClipBoard.setStringAsync(text);
      console.log('Copied to Clipboard');
      setIsCopied(true);
      setTimeout(()=>{
        setIsCopied(false);
      }, 2000);
      return true;
    }
    catch(error){
      console.log('failed to copy text : ', error);
      setIsCopied(false);
      return false;
    }
  };
  return {isCopied, copyToClipboard};
};

export {useCopyToClipboard};
