import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/EvilIcons';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Icon name={'bars'} size={22} color={'#000'} />
      <View style={styles.containerView}>
        <Icon2 name={'location'} size={18} color={'#000'} />
        <Text style={styles.locationText}>Noida</Text>
      </View>
      <Icon name={'bell'} size={22} color={'#000'} />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,
  },
  containerView: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
  },
  locationText: {fontSize: 12, color: '#fff', marginHorizontal: 5},
});
