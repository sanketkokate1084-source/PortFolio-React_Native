import {CustomButton} from '@/components/CustomComponents';
import ThemedText from '@/components/CustomComponents/ThemedText/ThemedText';
import ThemedView from '@/components/CustomComponents/ThemedView/ThemedView';
import {Divider} from '@/components/ui/divider';
import {HStack} from '@/components/ui/hstack';
import {Slider, SliderFilledTrack, SliderThumb,  SliderTrack} from '@/components/ui/slider';
import {VStack} from '@/components/ui/vstack';
import {ArrowUp, CircleX, Expand, Info} from 'lucide-react-native';
import React, {RefObject, createRef, useEffect, useMemo, useState} from 'react';
import {ScrollView,  TextInput,  View, useWindowDimensions} from 'react-native';
import Animated, {FadeInDown, FadeInUp, FadeOutDown, FadeOutUp, LinearTransition, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import calculateRank from './CalcMatrix'; 
import {styleMerge} from '@/utilities/Styling';
import {Icon} from '@/components/ui/icon';
import {Popover,  PopoverBackdrop, PopoverBody,  PopoverContent,  PopoverHeader} from '@/components/ui/popover';
import {Stack} from 'expo-router';

const RankOfMatrixCalculator = () => {

  const [matrixInputExpanded, setMatrixInputExpanded] = useState<'expanded' | 'collapsed'>('expanded');

  const sharedHeight = useSharedValue(0);
  const sharedWidth = useSharedValue(0);
  const sharedPosition = useSharedValue<string>('relative');
  const sharedTranslateX = useSharedValue<number>(0);
  const sharedTranslateY = useSharedValue<number>(0);
  const animationDuration = 350;

  const windowDimentions = useWindowDimensions();
  const windowHeight = windowDimentions?.height;
  const windowWidth = windowDimentions?.width;
  const SizeMatrix={
    expanded : {
      container : {
        height: windowHeight * 0.45,
        width: windowWidth,
        translateX: 0,
        translateY:0,
        position: 'relative',
      },
    },
    collapsed: {
      container : {
        height: 50,
        width: 50,
        translateX: 20,
        translateY: 50,
        position: 'absolute',
      },
   
    },
  };

  const isExpanded  = matrixInputExpanded === 'expanded';
  
  const [matrixSize, setMatrixSize] = useState<{rows:number, columns:number}>({
    rows:1,
    columns:1,
  });
  const [matrix, setMatrix] = useState<number[][]>([]);

  const Rmax = 7;
  const Cmax =7;
  const Rcurr = matrixSize.rows;
  const Ccurr = matrixSize.columns;
  const HMWin = SizeMatrix.expanded.container.height*0.55;
  const WMWin = SizeMatrix.expanded.container.width-20;
  const VVCmax = 4;
  const HVCmax = 5;
  const VVCact = Math.min(Rcurr, VVCmax);
  const HVCact = Math.min(Ccurr, HVCmax);
  const SOCV = HMWin/VVCact;
  const SOCH = WMWin/HVCact;
  const SOCabs = Math.min(SOCV, SOCH);
  const MU = Math.min(HMWin, WMWin) * 0.1;
  const CMV = MU / VVCact;
  const CMH = MU / HVCact;
  const CMabs = Math.min(CMV, CMH);
  const SOIabs = SOCabs-(2*CMabs);

  const [solutionArray, setSolutionArray] = useState<React.ComponentType[]>([]);
  
  const inputRefArray = useMemo(()=>{
    const tempInputRefArray:RefObject<TextInput | null>[][] =[];  
    for(let i=0;i<matrixSize.rows ;i++){
      tempInputRefArray[i]=   [];
      for(let j=0;j<matrixSize.columns; j++){
        tempInputRefArray[i][j] = createRef<TextInput>();
      }
    }
    return tempInputRefArray; 
  }, [matrixSize]);

  const [openPopOver, setOpenPopOver] = useState(false);

  useEffect(()=>{

    if(matrixInputExpanded === 'expanded'){
      sharedPosition.value = SizeMatrix.expanded.container.position;
      sharedHeight.value = withTiming(SizeMatrix.expanded.container.height, {
        duration: animationDuration,
      });
      sharedWidth.value = withTiming(SizeMatrix.expanded.container.width, {
        duration: animationDuration,
      });
      sharedTranslateX.value = withTiming(SizeMatrix.expanded.container.translateX, {
        duration: animationDuration,
      });
      sharedTranslateY.value = withTiming(SizeMatrix.expanded.container.translateY, {
        duration: animationDuration,
      });

    }else{
      sharedHeight.value = withTiming(SizeMatrix.collapsed.container.height, {
        duration: animationDuration,
      });
      sharedWidth.value = withTiming(SizeMatrix.collapsed.container.width, {
        duration: animationDuration,
      });
      sharedTranslateX.value = withTiming(SizeMatrix.collapsed.container.translateX, {
        duration: animationDuration,
      });
      sharedTranslateY.value = withTiming(SizeMatrix.collapsed.container.translateY, {
        duration: animationDuration,
      });
      sharedPosition.value = SizeMatrix.collapsed.container.position;
     
    }
  }, [matrixInputExpanded]);

  const animatedContainerStyle = useAnimatedStyle(()=>{
    return {
   
      height: sharedHeight.value,
      width: sharedWidth.value,
      position: sharedPosition.value,
      transform:[
        {translateX: sharedTranslateX.value},
        {translateY: sharedTranslateY.value},
      ],
    };
  },
  );

  const configureMatrix = ()=>{
    const tempMatrix:number[][] = [];
    for(let i=0; i<matrixSize.rows;i++){
      tempMatrix[i] = [];
      for(let j=0;j<matrixSize.columns;j++){
        tempMatrix[i][j] = matrix?.[i]?.[j] || 0;
      }
    }
    return tempMatrix;
  };

  const buildMatrix =(rowIndex:number, colIndex:number, value:any)=>{
    let temporaryMatrix = [...matrix];
    temporaryMatrix[rowIndex][colIndex] = Number(value);
    return temporaryMatrix;
  };

  useEffect(()=>{
    setMatrix(configureMatrix());
  }, [matrixSize.rows, matrixSize.columns]);

  return (
    <ThemedView className={'w-full flex-1 h-full bg-background '}>
      <Stack.Screen options={{title:'Rank Of Matrix'}}  />
      {/* Container for the matrix input */}
      <Animated.View  style={[
        {
          overflow:'hidden',
          zIndex:1,
          borderRadius: 20,
          padding: isExpanded ? 10 : 0,
        }
        , animatedContainerStyle]}>
        <ThemedView className={styleMerge('w-full h-full bg-background-dark  ', isExpanded ? 'border-border border-2' : 'border-none')}>

          {/* Header (Configure matrix + Button) */}
          <Animated.View style={[{
            position:'absolute',
            zIndex:2,
            top:isExpanded ? 5 : 0,
            height:50, 
            width: 50,
          }]}>
            <CustomButton
              onPress={()=>{
                setMatrixInputExpanded(matrixInputExpanded === 'expanded' ? 'collapsed' : 'expanded');
              }}
              buttonStyle={'w-full h-full bg-foreground-light  justify-center items-center'}
              buttonText={''}
              icon={()=>{
                if(isExpanded){
                  return (<Icon as={CircleX}  size={40} className={'text-secondary-foreground'}  /> );
                }
                else{
                  return (<Icon as={Expand}  size={35} className={'text-secondary-foreground'} />);
                }
              }}
            />
          </Animated.View>
       
          {/* Body */}
          {matrixInputExpanded === 'expanded' ? (
            <ThemedView className={'h-full w-full bg-transparent dark:bg-transparent' }>
              <ThemedView style={
                {
                  height:SizeMatrix.expanded.container.height*(15/100),
                }
              } className={'h-14 items-center justify-center bg-transparent dark:bg-transparent'}>
                <HStack className={'w-full justify-between items-center'}>
                  <View className={'w-1/5'}>
                  </View>
                  <ThemedText className={'text-2xl font-bold w-3/5 '}>Configure Matrix</ThemedText>
                  <Popover
                    isOpen={openPopOver}
                    onClose={()=>{setOpenPopOver(false);}}
                    onOpen={()=>{setOpenPopOver(true);}}
                    placement={'bottom'}
                    shouldFlip
                    trigger={triggerProps => {
                      return (
                        <View className={'w-1/5 justify-end items-end'}>
                          <CustomButton {...triggerProps}
                            buttonText={''}
                            icon={()=>(<Icon as={Info} size={40} className={' bg-foreground-dark'} />)} 
                            buttonStyle={'bg-transparent dark:bg-transparent w-16'}
                          />
                        </View>

                      // <Button {...triggerProps}>
                      //   <ButtonText>Open Popover</ButtonText>
                      // </Button>
                      );
                    }}
                  >
                    <PopoverBackdrop />
                    <PopoverContent className={'bg-background-dark '}>
                      <PopoverHeader>
                        <ThemedText className={'text-xl'}>
                          Find Rank of given Matrix by Gaussian Elimination method
                        </ThemedText>
                      </PopoverHeader>
                      <Divider className={'border-border'}  />

                      <PopoverBody>
                        <ThemedText className={'text-foreground text-md'}>
                          Given a Matrix of any size, This program calculates the Rank of matrix using Gussian Elimination Method (self implemented)
                        </ThemedText>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </HStack>

              </ThemedView>
              <Divider></Divider>
              <HStack style={{
                height:SizeMatrix.expanded.container.height*(15/100),
              }} className={'w-full gap-2  justify-around items-center px-10'}>
                <VStack className={'w-1/2 p-3 gap-2'}>
                  <ThemedText className={' text-sm font-semibold'}>Rows: {matrixSize.rows}</ThemedText>
                  <Slider
                    step={1}
                    size={'lg'}
                    defaultValue={matrixSize.rows}
                    minValue={1}
                    maxValue={Rmax}  
                    onChange={number=>{
                      setMatrixSize(prev=>({...prev, rows: number}));
                    }}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </VStack>
                <VStack className={'w-1/2 p-3 gap-2'}>
                  <ThemedText className={' text-sm font-semibold'}>Columns: {matrixSize.columns}</ThemedText>
                  <Slider
                    step={1}
                    size={'lg'}
                    minValue={1}
                    maxValue={Cmax} 
                    onChange={number=>{
                      setMatrixSize(prev=>({...prev, columns: number}));
                    }}
                    defaultValue={matrixSize.columns}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </VStack>
              </HStack>
              <Divider></Divider>
              <ThemedView
                style={{
                  height:HMWin,
                }}
                className={'  justify-center items-center overflow-hidden bg-transparent dark:bg-transparent'}
              >
                <ScrollView persistentScrollbar keyboardShouldPersistTaps={'handled'}
                >
                  <ScrollView
                    horizontal
                    persistentScrollbar
                    keyboardShouldPersistTaps={'handled'}
                  >
                    <ThemedView className={'bg-transparent dark:bg-transparent'}>

                      {matrix.map((row, rowIndex)=>{
                        return (
                          <HStack key={rowIndex}  className={'flex-row'}>
                            {row.map((col, colIndex)=>{
                              return (
                                <Animated.View key={`${colIndex}-${rowIndex}`} entering={FadeInUp.duration(animationDuration)} exiting={FadeOutDown.duration(animationDuration)} layout={LinearTransition.duration(animationDuration)}>
                                  <ThemedView
                                    style={{
                                      width: SOCabs,
                                      height: SOCabs,
                                    }}
                                    className={'bg-tertiary-100'}
                                  >
                                    <TextInput 
                                      ref={inputRefArray?.[rowIndex]?.[colIndex] || null}
                                      scrollEnabled={false}
                                      style={{  
                                        fontSize: 300 / (3*(VVCact+HVCact)),
                                        margin:CMabs,
                                        width: SOIabs,
                                        height: SOIabs,
                                        textAlign: 'center',
                                      }}
                                      defaultValue={matrix[rowIndex][colIndex].toString()}
                                      keyboardType={'number-pad'}
                                      submitBehavior={(rowIndex===((matrixSize.rows)-1) && colIndex===(matrixSize.columns-1)) ?'blurAndSubmit' : 'submit'}
                                      selectTextOnFocus
                                      onSubmitEditing={()=>{ 
                                        const nextColIndex = (colIndex+1)%matrixSize.columns;
                                        const nextRowIndex = (colIndex+1)%matrixSize.columns === 0 ?  rowIndex+1 : rowIndex;
                                        const target = inputRefArray?.[nextRowIndex]?.[nextColIndex]?.current;
                                        if (target) {
                                          target.focus();
                                        }}}
                                      className={'rounded-xl border-secondary bg-secondary  p-0 text-foreground'}
                                      onChangeText={value=>{
                                        setMatrix(buildMatrix(rowIndex, colIndex, value));
                                      }}
                                    />
                                  </ThemedView>
                                </Animated.View>

                              );
                            })}
                          </HStack>
                        );
                      })}
                    </ThemedView>
                  
                  </ScrollView>
                </ScrollView>
                
              </ThemedView>

              <ThemedView style={{
                height:SizeMatrix.expanded.container.height*(15/100),
              }} className={'w-full items-center flex-1 justify-center bg-transparent dark:bg-transparent'}>
                <CustomButton
                  buttonText={'Calculate Rank'}
                  onPress={()=>{
                    const modifiedMatrix = structuredClone(matrix);
                    
                    modifiedMatrix.unshift(new Array(10).fill(0));

                    modifiedMatrix.map((row, rowIndex)=>{
                      if(rowIndex!==0){
                        row.unshift(0);
                        const length = row.length;
                        for(let i=length;i<=10;i++){
                          row.push(0);
                        }
                      }
                      return row;
                    });

                    const [solutionComponentArray, rank] = calculateRank(modifiedMatrix, matrixSize.rows, matrixSize.columns);
                    setSolutionArray(solutionComponentArray);
                  }}
                  buttonStyle={'bg-primary border-border w-full w-1/2'}
                  textStyle={'font-bold text-primary-foreground' }
                />
              </ThemedView>
            </ThemedView>
          ) : null}
        </ThemedView>
      </Animated.View>
      <Divider className={'w-11/12 self-center my-2 bg-border'}>
      </Divider>
      <View className={'flex-1 '}>
        <ScrollView 
        >
          <Animated.View   style={{borderRadius:20,  overflow:'hidden'}}>
            <ThemedView className={' w-full bg-transparent rounded-xl py-5 justify-center items-center'}>
              <ThemedView className={'p-b-20 '}>
                <ThemedText className={'text-3xl font-bold'}>Solution</ThemedText>
              </ThemedView>
              {solutionArray.map((SolutionComponent, index)=>{
                return (
                  <Animated.View  key={Math.random()+index} entering={FadeInDown} exiting={FadeOutUp}>
                    {SolutionComponent}
                  </Animated.View>
                ) ;
              })}
            
            </ThemedView>
          </Animated.View>
        </ScrollView>

      </View>
      
    </ThemedView>

  );
};

export default RankOfMatrixCalculator;
