import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../../utils/styles';
import {
  PartialRoute,
  Route,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackParamList} from '../../navigation/types';
import {useEffect, useState} from 'react';
import {FlatList, Pressable} from 'react-native-gesture-handler';
import {colors} from '../../utils/colors';
import CommentBox from '../../component/CommentBox';
import {StackNavigationProp} from '@react-navigation/stack';
import {HeaderBackButton} from '@react-navigation/elements';
import LoadingText from '../../component/LoadingText';
import ErrorTapable from '../../component/ErrorTapable';

type PostDetailRouteProps = RouteProp<StackParamList, 'Post Detail'>;
type NavigationProps = StackNavigationProp<StackParamList, 'User Detail'>;

export default function PostDetail(): React.JSX.Element {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<PostDetailRouteProps>();
  const {user, post} = route.params;

  const [comments, setComments] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    const commentUrl = `https://jsonplaceholder.typicode.com/posts/${post?.id}/comments`;
    try {
      setIsError(false);
      setLoading(true);
      const responseComments = await fetch(commentUrl);
      const dataComments = await responseComments.json();
      setComments(dataComments);
      setLoading(false);
      console.log('fetch complete');
    } catch (error) {
      setLoading(false);
      setIsError(true);
      console.log('fetch error', error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log('route index', navigation.getState().routes);
  }, []);
  useEffect(() => {
    console.log('comments', comments);
  }, [comments]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={comment => (
          <CommentBox
            name={comment.item?.name}
            email={comment.item?.email}
            body={comment.item?.body}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View style={{marginBottom: 5}}>
              <Text style={styles.postTitle}>{post?.title}</Text>
              <Pressable
                onPress={() => {
                  if (navigation.getState().routes.length > 2) {
                    navigation.replace('User Detail', {
                      user: user,
                    });
                  } else {
                    navigation.navigate('User Detail', {
                      user: user,
                    });
                  }
                }}>
                <Text
                  style={[
                    styles.userInfoText,
                    {fontWeight: '700', color: colors.black},
                  ]}>
                  {user?.name}
                </Text>
                <Text style={styles.userInfoText}>{user?.email}</Text>
              </Pressable>
            </View>
            <Text style={{fontSize: 15}}>{post?.body}</Text>
            <Text style={styles.commentHeader}>Comments:</Text>
            {loading && <LoadingText>Loading comments...</LoadingText>}
          </>
        )}
        contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 16}}
      />
      {isError && <ErrorTapable onPress={() => fetchData()} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userInfoText: {
    color: colors.slate400,
    fontSize: 15,
  },
  commentHeader: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
});
