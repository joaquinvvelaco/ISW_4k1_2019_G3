import React, { Fragment } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import QueBuscamos from './src/screens/QueBuscamos'
import DondeBuscamos from './src/screens/DondeBuscamos'
import FormaDePago from './src/screens/FormaDePago'
import DondeEntregamos from './src/screens/DondeEntregamos'

import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducers from './src/reducers';

const store = createStore(reducers, applyMiddleware(thunk))

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2f95dc',
    accent: '#f1c40f',
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme} >
        <ApplicationProvider
          mapping={mapping}
          theme={lightTheme}>
          <QueBuscamos />
        </ApplicationProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
