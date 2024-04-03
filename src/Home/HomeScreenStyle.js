import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 100,
    marginTop: 100,
    top: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 10,
  },
  searchTextInput: {
    paddingHorizontal: 10,
    color: '#000',
  },
  categoryItem: {
    margin: 10,
    padding: 10,
  },
  categoryItemText: {
    textTransform: 'capitalize',
    fontSize: 11,
    paddingVertical: 5,
    color: '#000',
  },
  categoryItemContainer: {
    alignItems: 'center',
  },
  categoryItemIIContainer: {
    margin: 15,
    padding: 10,
    shadowColor: '#000',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
  },
  categoryItemIIText: {
    textTransform: 'capitalize',
    fontSize: 22,
    fontWeight: '600',
    paddingVertical: 5,
    color: '#000',
  },
  categoryItemIIPriceText: {
    textTransform: 'capitalize',
    fontSize: 16,
    color: '#000',
  },
  categoryItemIICategoryText: {
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
    textTransform: 'capitalize',
    fontSize: 10,
    color: '#000',
    padding: 1,
  },
  categoryItemIIDetailsText: {
    textTransform: 'capitalize',
    width: (Dimensions.get('screen').height * 14) / 100,
    color: '#000',
    fontSize: 10,
    marginVertical: 5,
  },
  categoryItemImage: {
    width: 50,
    height: 50,
  },
  categoryItemIIImage: {
    width: 140,
    height: 140,
    marginHorizontal: 10,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
  },
  sectionHeaderText: {
    fontSize: 14,
    color: '#000',
  },
  sectionHeaderLinkText: {
    fontSize: 14,
    color: 'orange',
  },
  noDataText: {
    textAlign: 'center',
    color: '#000',
    marginVertical: 20,
    fontWeight: '600',
  },
  showMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  noDataTextII: {
    textAlign: 'center',
    marginHorizontal: 150,
    color: '#000',
    marginVertical: 20,
    fontWeight: '600',
  },
  priceCatView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
