import {
  PartialRoute,
  Route,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StackParamList} from '../../navigation/types';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../../utils/styles';
import {colors} from '../../utils/colors';
import {FlatList} from 'react-native-gesture-handler';
import PostBox from '../../component/PostBox';
import {StackNavigationProp} from '@react-navigation/stack';
import {HeaderBackButton} from '@react-navigation/elements';
import LoadingText from '../../component/LoadingText';
import ErrorTapable from '../../component/ErrorTapable';

type UserDetailRouteProps = RouteProp<StackParamList, 'Post Detail'>;
type NavigationProps = StackNavigationProp<StackParamList, 'Post Detail'>;

export default function UserDetail(): React.JSX.Element {
  const route = useRoute<UserDetailRouteProps>();
  const navigation = useNavigation<NavigationProps>();
  const {user} = route.params;

  const [userPosts, setUserPosts] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    const userPostsUrl = `https://jsonplaceholder.typicode.com/users/${user?.id}/posts`;
    try {
      setIsError(false);
      setLoading(true);
      const userPostsRes = await fetch(userPostsUrl);
      const userPostsData = await userPostsRes.json();
      setUserPosts(userPostsData);
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
    console.log('userPosts', userPosts);
  }, [userPosts]);

  return (
    <SafeAreaView style={[globalStyles.container]}>
      <FlatList
        data={userPosts}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={post => (
          <PostBox
            numberOfLines={3}
            title={post.item?.title}
            desc={post.item?.body}
            onPress={() => {
              if (navigation.getState().routes.length > 2) {
                navigation.replace('Post Detail', {
                  user: user,
                  post: post.item,
                });
              } else {
                navigation.navigate('Post Detail', {
                  user: user,
                  post: post.item,
                });
              }
            }}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.userInfoText}>{user?.username}</Text>
            <Text style={styles.userInfoText}>{user?.email}</Text>
            <View style={styles.infoContainer}>
              <InfoCard
                title="Address"
                value={`${user?.address?.suite}, ${user?.address?.street} Street, ${user?.address?.city} City, ${user?.address?.zipcode}`}
              />
              <InfoCard title="Phone Number" value={user?.phone} />
              <InfoCard title="Website" value={user?.website} />
            </View>
            <Text style={styles.postsHeader}>User's Post:</Text>
            {loading && <LoadingText>Loading posts...</LoadingText>}
          </>
        )}
        contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 16}}
      />
      {isError && <ErrorTapable onPress={() => fetchData()} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userInfoText: {
    fontSize: 17,
    fontWeight: '600',
  },
  infoContainer: {
    marginVertical: 8,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  postsHeader: {
    fontSize: 17,
    fontWeight: '700',
    marginVertical: 10,
  },
});

interface InfoCardProps {
  title: string;
  value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({title, value}) => {
  return (
    <View style={{marginBottom: 5}}>
      <Text style={styles.infoTitle}>{title}:</Text>
      <Text style={{fontSize: 15}}>{value}</Text>
    </View>
  );
};
