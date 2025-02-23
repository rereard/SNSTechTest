import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Post from '../screen/Post';
import Profile from '../screen/Profile';
import React from 'react';
import PostDetail from '../screen/PostDetail';
import UserDetail from '../screen/UserDetail';
import {colors} from '../utils/colors';
import MDIcon from '@react-native-vector-icons/material-design-icons';
import {StackParamList, TabParamList} from '../navigation/types';
import {globalStyles} from '../utils/styles';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const Home = (): React.JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => {
        const routes = navigation.getState()?.routes || [];
        const lastIndex = routes.length - 1;
        const currentIndex = routes.findIndex(r => r.name === route.name);
        return {
          tabBarActiveTintColor: colors.black,
          tabBarStyle: {
            borderTopWidth: 1.5,
            borderColor: colors.black,
            backgroundColor: colors.white,
          },
          tabBarItemStyle: {
            borderRightWidth: currentIndex !== lastIndex ? 1.5 : 0,
          },
          tabBarInactiveBackgroundColor: colors.grey,
        };
      }}>
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MDIcon name="post-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MDIcon name="account-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function Router(): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle: {backgroundColor: colors.black},
        animation: 'slide_from_bottom',
        headerShown: true,
        headerStyle: [
          {
            borderBottomWidth: 1.5,
            borderColor: colors.black,
            backgroundColor: colors.white,
          },
          globalStyles.shadow,
        ],
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Post Detail" component={PostDetail} />
      <Stack.Screen name="User Detail" component={UserDetail} />
    </Stack.Navigator>
  );
}
