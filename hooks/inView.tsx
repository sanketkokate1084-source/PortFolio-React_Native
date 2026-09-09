import {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';

export const useInView = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(Platform.OS !== 'web'); // native: always true

  useEffect(() => {
    if (Platform.OS !== 'web' || !ref.current) {return;}

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); 
        }
      },
      {threshold: 0.2}, // 20% visible triggers it
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return {ref, inView};
};
