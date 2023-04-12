import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Home from './src/components/Home';
import Test from './src/components/Test';
import Toast from 'react-native-toast-message';

export default function App () {        
    return (
        <Provider store={store}>
          {/* <Test/> */}
          <Toast />
          <Home/>          
        </Provider>
    );
}
