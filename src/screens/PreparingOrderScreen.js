import { SafeAreaView } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native'

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery')
    }, 4000)
  }, []);
  
  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-[#3DAA9C]'>
      <Animatable.Image
        source={require('../../assets/carloading.gif')}
        animation='slideInUp'
        iterationCount={1}
        className='h-96 w-96'
      />
      <Animatable.Text
        animation='slideInUp'
        iterationCount={1}
        className='text-lg mb-5 text-white font-bold text-center'
      >
        Waiting for  Restaurant to accept your order!
      </Animatable.Text>
      <Progress.Circle size={50} indeterminate={true} color='white' />
    </SafeAreaView>
  )
}

export default PreparingOrderScreen