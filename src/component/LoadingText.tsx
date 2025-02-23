import {StyleSheet, Text} from 'react-native';
import {colors} from '../utils/colors';
import {ReactNode} from 'react';

interface LoadingTextProps {
  children: ReactNode;
}

const LoadingText: React.FC<LoadingTextProps> = ({children}) => {
  return <Text style={styles.text}>{children}</Text>;
};

export default LoadingText;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 17,
    color: colors.slate400,
  },
});
