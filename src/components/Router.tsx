import React from 'react';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { AppContext } from '../app-context';
import { ScrollView, View } from 'react-native';
import { AppBar } from './ui/AppBar';
import { Drawer } from './ui/Drawer';
import { ROUTES } from '../routes';
import { Snackbar } from './ui/Snackbar';
import { parseStyle } from '../utils/styles-parser';
import { isMobile } from '../utils/platform-checker';
import { Spacer } from './ui/Spacer';

export type RouterProps = {
    appContext: AppContext;
};

export const Router: React.FC<RouterProps> = ({ appContext }) => {
    return (
        <NativeRouter>
            <Drawer appContext={appContext} />
            <AppBar appContext={appContext} />
            <View
                style={parseStyle({
                    // flex: 1,
                    marginTop: '0.5rem',
                    marginLeft: '1rem',
                    marginRight: '1rem',
                    marginBottom: '1rem',
                })}
            >
                <Snackbar appContext={appContext} />
                <ScrollView>
                    {
                        // This space is needed in web because of the floating app bar
                        !isMobile() ? <Spacer margin="1rem" /> : null
                    }
                    <Routes>
                        {Object.values(ROUTES).map((route) => (
                            <Route
                                path={route.path}
                                element={<route.component appContext={appContext} />}
                                key={route.path}
                            />
                        ))}
                    </Routes>
                    {
                        // This space is needed because of a missing part of the scroll view
                        isMobile() ? <Spacer margin="3rem" /> : null
                    }
                </ScrollView>
            </View>
        </NativeRouter>
    );
};
