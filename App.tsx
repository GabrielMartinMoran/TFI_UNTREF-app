import React from 'react';
import { StyleSheet } from 'react-native';
import { AppContext } from './src/app-context';
import { Router } from './src/components/Router';

export default function App() {

    const appContext = new AppContext();


    return (
        <Router appContext={appContext}/>
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
