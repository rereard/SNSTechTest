import {NavigatorScreenParams} from '@react-navigation/native';

export type TabParamList = {
  Post: undefined;
  Profile: undefined;
};

export type StackParamList = {
  Home: NavigatorScreenParams<TabParamList>;
  'Post Detail': {
    user: Record<string, any>;
    post: Record<string, any>;
  };
  'User Detail': {user: Record<string, any>};
};
