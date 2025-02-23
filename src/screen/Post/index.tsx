import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, Pressable, Text} from 'react-native-gesture-handler';
import {globalStyles} from '../../utils/styles';
import PostBox from '../../component/PostBox';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../navigation/types';
import LoadingText from '../../component/LoadingText';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../utils/colors';
import ErrorTapable from '../../component/ErrorTapable';

type NavigationProps = StackNavigationProp<StackParamList, 'Post Detail'>;

export default function Post(): React.JSX.Element {
  const navigation = useNavigation<NavigationProps>();

  const [posts, setPosts] = useState<Record<string, any>[]>([]);
  const [users, setUsers] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    const postUrl = 'https://jsonplaceholder.typicode.com/posts';
    const userUrl = 'https://jsonplaceholder.typicode.com/users';
    try {
      setIsError(false);
      setLoading(true);
      const [postResp, userResp] = await Promise.all([
        fetch(postUrl),
        fetch(userUrl),
      ]);
      const [postResult, userResult] = await Promise.all([
        postResp.json(),
        userResp.json(),
      ]);
      setPosts(postResult);
      setUsers(userResult);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setIsError(true);
      console.log('fetch error', error);
    }
  };

  useEffect(() => {
    if (posts.length === 0 && users.length === 0) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    console.log('posts', posts);
    console.log('users', users);
  }, [posts, users]);

  const findUserById = (userId: number): Record<string, any> => {
    const user: any = users.find(u => u.id === userId);
    return user;
  };

  return (
    <SafeAreaView style={[globalStyles.container, {position: 'relative'}]}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={post => (
          <PostBox
            title={post.item?.title}
            numberOfLines={3}
            username={findUserById(post.item?.userId)?.name}
            desc={post.item?.body}
            onPress={() => {
              navigation.navigate('Post Detail', {
                user: findUserById(post.item?.userId),
                post: post.item,
              });
            }}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <Text style={globalStyles.headerTitle}>User Posts:</Text>
            {loading && <LoadingText>Loading posts...</LoadingText>}
          </>
        )}
        contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 16}}
      />
      {isError && <ErrorTapable onPress={() => fetchData()} />}
    </SafeAreaView>
  );
}
