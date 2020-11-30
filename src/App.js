import React from 'react';
import Main from './screens';
import {Provider} from 'react-redux';
import {SafeAreaView, StyleSheet} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';

import store from './redux/store';

const App = () => {
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
