
import {CustomButton} from '@/components/CustomComponents';
import ThemedView from '@/components/CustomComponents/ThemedView/ThemedView';
import {useState} from 'react';
import {Dimensions,  Image, View} from 'react-native';
import Animated, {useAnimatedReaction, useSharedValue} from 'react-native-reanimated';

const imagesSource = [
  {source: require('@/assets/images/HomePhoto1.jpg')},
  {source: require('@/assets/images/HomePhoto2.jpg')},
  {source: require('@/assets/images/HomePhoto3.jpg')},
  {source: require('@/assets/images/HomePhoto4.jpg')},
  {source: require('@/assets/images/HomePhoto5.jpg')},
  {source: require('@/assets/images/HomePhoto6.jpg')},
];

const width= Dimensions.get('window').width;
const height= Dimensions.get('window').height;
const _itemWidth = 200;
const _itemHeight = 350;
const _gap = 5;

const FirstAnimation = () => {
  const offset = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(2);

  useAnimatedReaction(()=>offset.value,
    currValue=>{
      const containerWidth = imagesSource.length*(_itemWidth+(2*_gap));
      const tempIndex= Math.abs(Math.round((currValue%containerWidth/_itemWidth)));
    },
  );
 
  return (
    <ThemedView style={{
      width:'100%',
      height:'100%',
      display:'flex',
      flexDirection:'column',
    }}>
      <View className={'h-full w-full absolute bg-green-500  '}>
        <Animated.Image
          style={{
            height:'100%',
            width:'100%',
            backgroundColor:'blue',
          }}
          source={imagesSource[activeIndex].source}
          alt={'background Image here'}
          blurRadius={10}
          fadeDuration={1000}
        />
      </View>
      <View
        style={
          {
            height:'70%',
            width: '100%',
            backgroundColor:'blue',
            justifyContent:'center',
          }
        }>

        {/* <Marquee 
          style={{
            height:_itemHeight,
            width:'100%',
            backgroundColor:'orange',
          }}
          speed={1}
          position={offset}
        >
          <View
            style={{
              height: _itemHeight,
              flexDirection: 'row',
              backgroundColor:'green',
            }}
          >
            {
              imagesSource.map((imageObj, index)=>{
                return (
                  <View
                    key={index}
                    style={{
                      width: _itemWidth,
                      height: _itemHeight,
                      marginHorizontal: _gap,
                      backgroundColor:'red',
                    }}
                  >
                    <Image
                      source={imageObj.source}
                      resizeMode={'stretch'}
                      style={{
                        width:_itemWidth,
                        height:_itemHeight,
                        borderRadius:20,
                      }}  
                    />
                  </View>
                );
              }) 
            }
          </View>
          
        </Marquee> */}
      </View>
      <View style={
        {
          height:'30%',
          width:'100%',
        }
      }>
        <CustomButton
          buttonText={'press me'}
          onPress={()=>{
            'worklet';
            offset.value=offset.value+1;
          }}
        />
      </View>
    </ThemedView>
  );
};

export default FirstAnimation;
