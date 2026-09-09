import {clsx} from 'clsx';
import {Platform} from 'react-native';
import {twMerge} from 'tailwind-merge';

export const styleMerge = (...styles)=> {
  return twMerge(clsx(styles));
};

type ShadowIntensity = 'sm'|'md'|'lg'|'xl'|'2xl';

const IOS_ANDROID_SHADOWS: Record<ShadowIntensity, object> = {
  'sm': {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.5,
    elevation: 2,
  },
  'md': {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 5,
  },
  'lg': {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 8,
  },
  'xl': {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 11,
  },
  '2xl': {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 16},
    shadowOpacity: 0.36,
    shadowRadius: 20,
    elevation: 14,
  },
};

// Web needs CSS boxShadow — RN shadow props don't compile to CSS
const WEB_SHADOWS: Record<ShadowIntensity, object> = {
  'sm':  {boxShadow: '0 1px 3px rgba(0,0,0,0.18)'},
  'md':  {boxShadow: '0 3px 8px rgba(0,0,0,0.22)'},
  'lg':  {boxShadow: '0 6px 16px rgba(0,0,0,0.26)'},
  'xl':  {boxShadow: '0 10px 24px rgba(0,0,0,0.3)'},
  '2xl': {boxShadow: '0 16px 40px rgba(0,0,0,0.36)'},
};

export const getShadow = (intensity: ShadowIntensity = 'md') => {
  return Platform.OS === 'web'
    ? WEB_SHADOWS[intensity]
    : IOS_ANDROID_SHADOWS[intensity];
};
