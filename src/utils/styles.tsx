import {StyleSheet} from 'react-native';
import {colors} from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    // borderWidth: 2,
    backgroundColor: colors.white,
    ...StyleSheet.absoluteFillObject,
    // height: SCREEN_HEIGHT,
    // width: SCREEN_WIDTH,
    flex: 1,
    // padding: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 17,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});
