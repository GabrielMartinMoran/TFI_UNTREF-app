import React, { useEffect, useState } from 'react';
import { PALLETE } from '../../pallete';
import { AppContext } from '../../app-context';
import { CONFIG } from '../../config';
import { useAppNavigate } from '../../hooks/use-app-navigate';
import { Drawer as RNPDrawer } from 'react-native-paper';
import { TouchableWithoutFeedback, View } from 'react-native';
import { ROUTES } from '../../routes';

export type DrawerProps = {
    appContext: AppContext;
};

export const Drawer: React.FC<DrawerProps> = ({ appContext }) => {
    const [visible, setVisible] = useState(false);
    const { navigateTo } = useAppNavigate(appContext);

    const showDrawer = () => {
        setVisible(true);
    };

    useEffect(() => {
        appContext.showDrawerCallback = showDrawer;

        return () => {
            appContext.showDrawerCallback = () => {};
        };
    }, []);

    const hideDrawer = () => {
        setVisible(false);
    };

    return (
        <>
            {visible ? (
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        zIndex: '1',
                    }}
                >
                    <View
                        style={{
                            height: '100%',
                            backgroundColor: PALLETE.BACKGROUND,
                            shadowColor: PALLETE.DRAWER_SHADOW,
                            shadowOffset: { width: 1, height: 0 },
                            shadowOpacity: 0.4,
                            shadowRadius: 2,
                            width: CONFIG.STYLES.DRAWER_WIDTH,
                        }}
                    >
                        <RNPDrawer.Section title="Some title">
                            <RNPDrawer.Item
                                label="Resumen general"
                                onPress={() => {
                                    hideDrawer();
                                    navigateTo({ route: ROUTES.home });
                                }}
                            />
                            <RNPDrawer.Item
                                label="Mis dispositivos"
                                onPress={() => {
                                    hideDrawer();
                                    navigateTo({ route: ROUTES.myDevices });
                                }}
                            />
                            <RNPDrawer.Item
                                label="Agregar dispositivo"
                                onPress={() => {
                                    hideDrawer();
                                    navigateTo({ route: ROUTES.searchDevices });
                                }}
                            />
                            <RNPDrawer.Item
                                label="Cerrar sesión"
                                onPress={() => {
                                    hideDrawer();
                                    navigateTo({ route: ROUTES.logout });
                                }}
                            />
                        </RNPDrawer.Section>
                    </View>
                    <TouchableWithoutFeedback onPress={hideDrawer}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: PALLETE.DRAWER_SHADOW,
                            }}
                        ></View>
                    </TouchableWithoutFeedback>
                </View>
            ) : null}
        </>
    );
};
