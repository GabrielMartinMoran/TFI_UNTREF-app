import React from 'react';
import { View, StatusBar } from 'react-native';
import { AppContext } from './src/app-context';
import { Router } from './src/components/Router';
import { PALLETE } from './src/pallete';

export default function App() {
    const appContext = new AppContext();

    return (
        <View
            style={{
                backgroundColor: PALLETE.BACKGROUND,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <StatusBar />
            <Router appContext={appContext} />
        </View>
    );
}
