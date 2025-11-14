import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Navigation from './src/navigation/Navigation'; // Adjust path if needed
import {persistor, store} from './src/redux/store';
import {Text, View} from 'react-native';

const App = () => {
  return (
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    //     <Navigation />
    //   </PersistGate>
    // </Provider>

    <View>
      <Text>This is react native text in RN app</Text>
    </View>
  );
};

export default App;
