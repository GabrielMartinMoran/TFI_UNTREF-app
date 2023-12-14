import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppContext } from './src/app-context';
import { Router } from './src/components/Router';
import { PALLETE } from './src/pallete';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { parseStyle } from './src/utils/styles-parser';

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
                style={parseStyle(
                    {},
                    {
                        paddingTop: '3rem',
                        backgroundColor: PALLETE.DARK_PRIMARY,
                    }
                )}
            ></View>
            <StatusBar style="light" />
            <View
                style={parseStyle(
                    {
                        backgroundColor: PALLETE.BACKGROUND,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    },
                    {
                        width: undefined,
                    }
                )}
            >
                <Router appContext={appContext} />
            </View>
        </PaperProvider>
    );
}
