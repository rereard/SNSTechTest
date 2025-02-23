import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Router from './src/router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <GestureHandlerRootView>
          <Router />
        </GestureHandlerRootView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
