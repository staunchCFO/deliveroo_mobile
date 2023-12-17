import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Currency from 'react-currency-formatter'
import {
    MinusCircleIcon,
    PlusCircleIcon
} from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, selectBasketItemsWithId, removeFromBasket } from '../../features/basketSlice'
import { urlFor } from '../../sanity'


const DishRow = ({
  id,
  name,
  description,
  price,
  image
}) => {
  const [ pressed, setPressed ] = React.useState(false)

  const items = useSelector((state) => selectBasketItemsWithId(state, id))
  const dispatch = useDispatch()

  const handlePress = () => setPressed(!pressed)
  const addItemToBasket = () => {
    dispatch(addToBasket({
      id,
      name,
      description,
      price,
      image
    }))
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;

    dispatch(removeFromBasket({ id }))
  }

  return (
    <>
        <TouchableOpacity 
          onPress={handlePress} 
          className={
            `bg-white border border-gray-200 p-4 mt-1
            ${pressed && 'border-b-0'}
            `}
        >
        <View className='flex-row'>
            <View className='flex-1 pr-2'>   
              <Text className='text-lg mb-1'>{name}</Text>
              <Text className='text-gray-400'>{description}</Text>
              <Text className='text-gray-400 mt-2'>
                <Currency quantity={price} currency='NGN' />
              </Text>
            </View>
            <View>
            <Image
                source={{
                    uri: urlFor(image).url()
                }}
                className='h-20 w-20 bg-gray-300 p-4'
            />
            </View>
        </View>
        </TouchableOpacity>

        {pressed && (
          <View className='bg-white px-4'>
            <View className='flex-row items-center space-x-2 pb-3'>
              <TouchableOpacity onPress={removeItemFromBasket}>
                <MinusCircleIcon 
                  size={30} 
                  color={items.length > 0 ? '#00ccbb' : 'gray'} 
                />
              </TouchableOpacity>
              <Text className='text-base'>{items.length}</Text>
              <TouchableOpacity onPress={addItemToBasket}>
                <PlusCircleIcon size={30} color='#00ccbb' />
              </TouchableOpacity>
            </View>
          </View>
        )}
    </>
  )
}

export default DishRow