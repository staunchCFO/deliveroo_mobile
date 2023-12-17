import { View, Text, SafeAreaView, Image, Platform, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  UserIcon,
  ChevronDownIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon
} from 'react-native-heroicons/outline'

import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../../sanity'

const HomeScreen = () => {
  const [
    featuredCategories,
    setFeatturedCatgories
  ] = React.useState();

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);

  React.useEffect(() => {
    sanityClient.fetch(`
    *[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        disahes[]->
      }
    }
    `).then((data) => {
      setFeatturedCatgories(data)
    });
  }, []);

  const android = Platform.OS === 'android'

  return (
    <SafeAreaView className={`bg-white pt-5 ${android && 'pt-[40px]'}`}>

      {/* Screen Header */}
      <View className='flex-row pb-3 items-center mx-4 space-x-2'>
        <Image
          source={{
            uri: 'https://links.papareact.com/wru'
          }}
          className='w-7 h-7 bg-gray-300 p-4 rounded-full'
        />
        <View className='flex-1'>
          <Text className='font-bold text-gray-400 text-xs'>Deliver now</Text>
          <Text className='font-bold text-xl' >
            Current Location
            <ChevronDownIcon size={20} color='#00ccbb' />
          </Text>
        </View>
        <UserIcon size={30} color='#00ccbb' />
      </View>

      {/* Search Container */}
      <View className='flex-row items-center space-x-2 pb-2 mx-4'>
        <View className='flex-1 flex-row space-x-2  bg-gray-200 p-3 items-center'>
          <MagnifyingGlassIcon size={20} color='gray' />
          <TextInput 
            placeholder='Restaurant and cuisines' 
            keyboardType='default'
          />
        </View>
        <AdjustmentsVerticalIcon size={30} color='#00ccbb' />
      </View>

      <ScrollView 
        className='bg-gray-100'
        contentContainerStyle={{
          paddingBottom: 100
        }}
      >
        {/* Categories List */}
        <Categories />

        {/* Featured Rows */}
        {featuredCategories 
          && featuredCategories.length > 0 
          && featuredCategories?.map((category) => (
          <FeaturedRow 
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen