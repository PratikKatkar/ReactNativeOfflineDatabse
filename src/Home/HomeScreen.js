import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ImageBackground,
  TextInput,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {createProductTable, db} from '../Database';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import HomeHeader from './HomeHeader';
import Icon from 'react-native-vector-icons/Feather';
import {styles} from './HomeScreenStyle';

const DataScreen = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [allCategoriesData, setAllCategoriesData] = useState([]);
  const [isOnline, setIsOnline] = useState(undefined);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [isOnline]);

  const fetchData = async () => {
    try {
      if (isOnline) {
        const response = await fetchRemoteData();
        setAllCategoriesData(response.products);
        insertProducts(response.products);
        updateCategories(response.products);
      } else {
        const offlineData = await fetchOfflineData();
        setAllCategoriesData(offlineData);
        updateCategories(offlineData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchRemoteData = async () => {
    const response = await axios.get('https://www.jsonkeeper.com/b/2B80');
    createProductTable();
    return response.data;
  };

  const fetchOfflineData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM productTable',
          [],
          (_, {rows}) => {
            const data = rows._array;
            resolve(data);
          },
          (_, error) => {
            console.error('Error fetching data from SQLite:', error);
            reject(error);
          },
        );
      });
    });
  };

  const insertProducts = products => {
    db.transaction(tx => {
      products.forEach(product => {
        tx.executeSql(
          'INSERT OR IGNORE INTO productTable (id, name, image, price, details, category) VALUES (?, ?, ?, ?, ?, ?)',
          [
            product.id,
            product.name,
            product.image,
            product.price,
            product.details,
            product.category,
          ],
          (_, {rowsAffected}) => {
            if (rowsAffected > 0) {
              console.log('Product inserted successfully');
            } else {
              // console.log('Product already exists or ignored');
            }
          },
          (_, error) => console.error('Error inserting product:', error),
        );
      });
    });
  };

  const updateCategories = products => {
    const categoryMap = {};
    products.forEach(product => {
      if (!categoryMap[product.category]) {
        categoryMap[product.category] = product;
      }
    });
    setCategories(Object.values(categoryMap));
  };

  const renderCategoryItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{margin: 10, padding: 10}}
        onPress={() =>
          navigation.navigate('CategoryScreen', {
            category: item.category,
            categoriesData: allCategoriesData,
          })
        }>
        <View style={styles.categoryItemContainer}>
          {item.image && (
            <Image source={{uri: item.image}} style={{width: 50, height: 50}} />
          )}
          <Text style={styles.categoryItemText}>{item.category}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderCategoryItemII = ({item}) => (
    <Pressable
      style={styles.categoryItemIIContainer}
      onPress={() =>
        navigation.navigate('CategoryScreen', {
          category: item.category,
          categoriesData: allCategoriesData,
        })
      }>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text style={styles.categoryItemIIText}>{item.name}</Text>
          <View style={styles.priceCatView}>
            <Text style={styles.categoryItemIIPriceText}>₹ {item.price}</Text>
            <Text style={styles.categoryItemIICategoryText}>
              {item.category}
            </Text>
          </View>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.categoryItemIIDetailsText}>
            {item.details}
          </Text>
        </View>
        <View>
          {item.image && (
            <Image
              source={{uri: item.image}}
              style={{width: 140, height: 140, marginHorizontal: 10}}
            />
          )}
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{backgroundColor: '#fff'}}>
        <ImageBackground
          source={require('../../Assets/Theame.png')}
          resizeMode="cover"
          // style={styles.image}
        >
          <HomeHeader />
          <View style={styles.searchBarContainer}>
            <Icon name={'search'} size={20} color={'orange'} />
            <TextInput
              placeholder="What're you looking for?"
              placeholderTextColor={'#555'}
              style={styles.searchTextInput}
            />
          </View>
        </ImageBackground>
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionHeaderText}>Shop for</Text>
          <Text style={styles.sectionHeaderLinkText}>Show all</Text>
        </View>
        <View>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            numColumns={4}
            ListEmptyComponent={() => {
              return !isOnline ? (
                <Text style={styles.noDataText}>No data found</Text>
              ) : (
                <Text style={styles.noDataText}>
                  Please check your internet connection
                </Text>
              );
            }}
          />
        </View>
        <View style={styles.showMoreContainer}>
          <Text style={styles.sectionHeaderText}>Shop for</Text>
          <Text style={styles.sectionHeaderLinkText}>Show all</Text>
        </View>
        <View>
          <FlatList
            data={categories}
            horizontal
            renderItem={renderCategoryItemII}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => {
              <Text style={styles.noDataTextII}>No data found</Text>;
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DataScreen;
