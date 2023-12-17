import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { XCircleIcon } from 'react-native-heroicons/solid'
import Currency from 'react-currency-formatter';

import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../../features/basketSlice'
import { selectRestaurant } from '../../features/restaurantSlice'
import { urlFor } from '../../sanity'


const BasketScreen = () => {
  const [ groupedItemsInBasket, setGroupedItemsInBasket ] = React.useState([])
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const basketTotal = useSelector(selectBasketTotal)
  const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectBasketItems)

  React.useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item)

      return results
    }, {});

    setGroupedItemsInBasket(groupedItems)
  }, [items])

  return (
    <SafeAreaView className={`flex-1 bg-white ${Platform.OS === 'android' && 'mt-[30px]'}`}>
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 border-b border-[#00ccbb] bg-white shadow-xs'>
          <View>
            <Text className='text-lg font-bold text-center'>Basket</Text>
            <Text className='text-gray-400 text-center'>
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className='rounded-full bg-gray-100 absolute top-3 right-5'
          >
            <XCircleIcon color='#00ccbb' height={30} width={30} />
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
          <Image 
            source={{
              uri: 'https://links.papareact.com/wru'
            }}
            className='h-7 w-7 bg-gray-300 p4 rounded-full'
          />
          <Text className='flex-1'>Deliver in 50-75 mins</Text>
          <TouchableOpacity>
            <Text className='text-[#00ccbb]'>
              Change
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className='divide-y  divide-gray-200'>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'>
              <Text className='text-[#00ccbb]'>{items.length} x</Text>
              <Image 
                source={{ uri: urlFor(items[0]?.image).url() }}
                className='h-12 w-12 rounded-full'
              />
              <Text className='flex-1'>{items[0]?.name}</Text>
              <Text className='text-gray-600'>
                <Currency quantity={items[0]?.price} currency='NGN' />
              </Text>
              <TouchableOpacity>
                <Text
                  className='text-[#00ccbb] text-xs'
                  onPress={() => dispatch(removeFromBasket({
                    id: key
                  }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className='p-5 bg-white mt-5 space-y-4'>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Subtotal</Text>
            <Text className='text-gray-400'>
              <Currency quantity={basketTotal} currency='NGN' />
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Delivery Fee</Text>
            <Text className='text-gray-400'>
              <Currency quantity={5.99} currency='NGN' />
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text>Order Total</Text>
            <Text className='font-extrabold'>
              <Currency quantity={basketTotal + 5.99} currency='NGN' />
            </Text>
          </View>
          <TouchableOpacity 
            className='rounded-lg bg-[#00ccbb] p-4' 
            onPress={() => navigation.navigate('PreparingOrder')}
          >
            <Text className='text-center text-white font-bold'>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen