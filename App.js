import React, { useState , useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Navigation from './components/Navigation'
import Drawer from './components/Drawer'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import fbConfig from './utils/fbConfig';
import rootReducer  from './store/reducers/rootReducer'
import { getAllSurah } from './store/actions/quranAction'
import {decode, encode} from 'base-64';

//Decoder untuk variable firebase yang tidak terdefinisi
if (!global.btoa) {  global.btoa = encode } 
if (!global.atob) { global.atob = decode }

//Inisiasi penyimpanan global redux
const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reactReduxFirebase(fbConfig),
    reduxFirestore(fbConfig, {attachAuthIsReady: true})
  )
);

//Komponen utama
const App = () =>  {
  const [isReady, setReady] = useState(false)

  //inisiasi fungsi untuk memuat font eksternal dengan metode asinkronus
  const init = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
      Quran: require('./assets/fonts/me_quran_2.ttf')
    })

    setReady(true)
  }

  //Pemanggilan fungsi untuk pertama kali saat komponen di render
  useEffect( async () => {
    init()
  }, [])

  if(!isReady) return <AppLoading />;

  //Render komponen
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

//Style component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
