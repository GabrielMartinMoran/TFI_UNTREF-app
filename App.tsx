import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { AppContext } from './src/app-context';
import { Router } from './src/components/Router';

export default function App() {
    const appContext = new AppContext();

    return (
        <View style={styles.app}>
            <StatusBar />
            <Router appContext={appContext} />
        </View>
    );
}

const styles = StyleSheet.create({
    app: {
        backgroundColor: '#fff',
        margin: '0.5rem',
    },
});
