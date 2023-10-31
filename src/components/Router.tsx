import React from 'react';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { AppContext } from '../app-context';
import { View } from 'react-native';
import { AppBar } from './ui/AppBar';
import { Drawer } from './ui/Drawer';
import { ROUTES } from '../routes';
import { Snackbar } from './ui/Snackbar';

export type RouterProps = {
    appContext: AppContext;
};

export const Router: React.FC<RouterProps> = ({ appContext }) => {
    return (
        <NativeRouter>
            <Drawer appContext={appContext} />
            <AppBar appContext={appContext} />
            <View
                style={{
                    flex: 1,
                    marginTop: '0.5rem',
                    marginLeft: '1rem',
                    marginRight: '1rem',
                    marginBottom: '1rem',
                }}
            >
                <Snackbar appContext={appContext} />
                <Routes>
                    {Object.values(ROUTES).map((route) => (
                        <Route
                            path={route.path}
                            element={<route.component appContext={appContext} />}
                            key={route.path}
                        />
                    ))}
                </Routes>
            </View>
        </NativeRouter>
    );
};
