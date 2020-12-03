import React, {useEffect} from 'react';
import Main from './src/screens/Main';
import {Provider} from 'react-redux';
import {SafeAreaView, StyleSheet} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

import store from './src/redux/store';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store().store}>
      <PersistGate loading={null} persistor={store().persistore}>
        <SafeAreaView style={styles.parent}>
          <Main />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
