import React, { useState , useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Navigation from './components/Navigation'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import fbConfig from './utils/fbConfig';
import rootReducer  from './store/reducers/rootReducer'
import { getAllSurah } from './store/actions/quranAction'
import {decode, encode} from 'base-64';

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reactReduxFirebase(fbConfig),
    reduxFirestore(fbConfig, {attachAuthIsReady: true})
  )
);


const App = () =>  {
  const [isReady, setReady] = useState(false)


  const init = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
      Quran: require('./assets/fonts/me_quran_2.ttf')
    })

    setReady(true)
  }

  useEffect( async () => {
    init()
    // store.dispatch(getAllSurah())
    // console.log(store.getState())
  }, [])

  if(!isReady) return <AppLoading />;

  return (

    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
