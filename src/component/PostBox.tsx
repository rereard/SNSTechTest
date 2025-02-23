import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../utils/colors';
import React from 'react';

interface PostBoxProps {
  title: string;
  username?: string;
  desc: string;
  onPress?: () => void;
  numberOfLines?: number;
}

const PostBox: React.FC<PostBoxProps> = ({
  title,
  username,
  desc,
  onPress,
  numberOfLines = undefined,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        {username && <Text style={styles.user}>{username || null}</Text>}
      </View>
      <Text numberOfLines={numberOfLines}>{desc.replace(/\n/g, ' ')}</Text>
    </Pressable>
  );
};

export default PostBox;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 8,
    padding: 8,
    marginBottom: 15,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderColor: colors.slate400,
    paddingBottom: 3,
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
  },
  user: {
    marginTop: 2,
    fontWeight: '500',
  },
});
