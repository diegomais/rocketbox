import { StyleSheet, Platform } from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  boxTitle: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
  },
  fab: {
    alignItems: 'center',
    backgroundColor: '#7159c1',
    borderRadius: 30,
    bottom: 30 + getBottomSpace(),
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    right: 30,
    width: 60,
  },
  file: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  fileDate: {
    color: '#666',
    fontSize: 14,
  },
  fileInfo: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  fileTitle: {
    color: '#333',
    fontSize: 16,
    marginLeft: 10,
  },
  list: {
    marginTop: 30,
  },
  separator: {
    backgroundColor: '#EEE',
    height: 1,
  },
});
