import React from 'react';
import { View, StatusBar } from 'react-native';
import { AppContext } from './src/app-context';
import { Router } from './src/components/Router';
import { PALLETE } from './src/pallete';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { isMobile } from './src/utils/platform-checker';
import { Spacer } from './src/components/ui/Spacer';

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
        <PaperProvider theme={theme}>
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
        </PaperProvider>
    );
}
