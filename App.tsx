import React from 'react';
import { View, StatusBar } from 'react-native';
import { AppContext } from './src/app-context';
import { Router } from './src/components/Router';
import { PALLETE } from './src/pallete';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

export default function App() {
    const appContext = new AppContext();

    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: PALLETE.PRIMARY,
            accent: PALLETE.ACCENT,
        },
    };

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
            <PaperProvider theme={theme}>
                <Router appContext={appContext} />
            </PaperProvider>
        </View>
    );
}
