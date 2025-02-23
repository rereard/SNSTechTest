import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../utils/colors';

interface CommentBoxProps {
  name: string;
  email: string;
  body: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({name, email, body}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
};

export default CommentBox;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: colors.slate400,
    marginBottom: 8,
  },
  userName: {fontWeight: '700'},
  email: {color: colors.slate400},
  body: {marginTop: 2},
});
