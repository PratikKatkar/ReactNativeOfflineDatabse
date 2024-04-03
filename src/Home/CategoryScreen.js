import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {styles} from './CategoryScreenStyle';

const CategoryScreen = ({route, navigation}) => {
  const {category, categoriesData} = route.params;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemCount, setItemCount] = useState({});
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const filteredProductsArray = categoriesData.filter(
      product => product.category === category,
    );
    setFilteredProducts(filteredProductsArray);
  }, [category]);

  useEffect(() => {
    navigation.setOptions({
      title: category,
      headerTitleAlign: 'center',
    });
  }, [navigation, category]);

  const handleIncrement = itemId => {
    setItemCount(prevCount => ({
      ...prevCount,
      [itemId]: (prevCount[itemId] || 0) + 1,
    }));
  };

  const handleDecrement = itemId => {
    setItemCount(prevCount => {
      const newCount = (prevCount[itemId] || 0) - 1;
      return {
        ...prevCount,
        [itemId]: newCount,
      };
    });
  };

  const toggleFavorite = itemId => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [itemId]: !prevFavorites[itemId],
    }));
  };

  const isFavorite = itemId => {
    return favorites[itemId];
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        renderItem={({item}) => (
          <View style={styles.cardContainer}>
            <View style={{alignItems: 'flex-end', padding: 2}}>
              <TouchableOpacity
                style={styles.favoriteIcon}
                onPress={() => toggleFavorite(item.id)}>
                {isFavorite(item.id) ? (
                  <Icon name={'heart'} size={18} color={'orange'} />
                ) : (
                  <Icon name={'hearto'} size={18} color={'orange'} />
                )}
              </TouchableOpacity>
            </View>
            {item.image != null ? (
              <Image source={{uri: item.image}} style={styles.image} />
            ) : (
              <Image
                source={require('../../Assets/default.webp')}
                style={styles.image}
              />
            )}
            <Text numberOfLines={1} style={styles.name}>
              {item.name}
            </Text>
            {item?.price != null && (
              <Text numberOfLines={1} style={styles.price}>
                ₹ {item?.price}
              </Text>
            )}
            <Text numberOfLines={2} style={styles.details}>
              {item.details}
            </Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              {itemCount[item.id] && itemCount[item.id] > 0 ? (
                <View style={styles.counterContainer}>
                  <TouchableOpacity onPress={() => handleDecrement(item.id)}>
                    <Text style={styles.textDecrement}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.mainCount}>{itemCount[item.id]}</Text>
                  <TouchableOpacity onPress={() => handleIncrement(item.id)}>
                    <Text style={styles.textIncrement}>+</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={() => handleIncrement(item.id)}>
                  <Text style={styles.addText}>ADD</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default CategoryScreen;
