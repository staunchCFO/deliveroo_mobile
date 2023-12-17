import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'
import sanityClient from '../../sanity'


const Categories = () => {
  const [ categories, setCategories ] = React.useState([]);

  React.useEffect(() => {
    sanityClient.fetch(
        `*[_type == "category"]`
    ).then((data) => {
        setCategories(data)
    })
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories?.map((category) => (
        <CategoryCard 
          key={category._id}
          imgUrl={category.image} title={category.name}
        />
      ))}
    </ScrollView>
  )
}

export default Categories