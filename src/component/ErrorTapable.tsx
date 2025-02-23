import {Pressable, StyleSheet, Text} from 'react-native';
import {colors} from '../utils/colors';
import React from 'react';

interface ErrorTappableProps {
  onPress?: () => void;
}

const ErrorTapable: React.FC<ErrorTappableProps> = ({onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>Error fetching data</Text>
      <Text style={styles.text}>Tap to try again</Text>
    </Pressable>
  );
};

export default ErrorTapable;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: colors.slate400,
    fontSize: 16,
    fontStyle: 'italic',
  },
});
