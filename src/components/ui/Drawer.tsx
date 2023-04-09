import React, { useEffect, useState } from 'react';
import { Appbar, Button as RNPButton, Text as RNPText } from 'react-native-paper';
import { PALLETE } from '../../pallete';
import { AppContext } from '../../app-context';
import { CONFIG } from '../../config';
import { useAppNavigate } from '../../hooks/use-app-navigate';
import { Drawer as RNPDrawer } from 'react-native-paper';
import { TouchableWithoutFeedback, View } from 'react-native';

export type DrawerProps = {
    appContext: AppContext;
};

export const Drawer: React.FC<DrawerProps> = ({ appContext }) => {
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState('');

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
                                active={active === 'home'}
                                onPress={() => setActive('home')}
                            />
                            <RNPDrawer.Item
                                label="Mis dispositivos"
                                active={active === 'my_devices'}
                                onPress={() => setActive('my_devices')}
                            />
                            <RNPDrawer.Item
                                label="Agregar dispositivo"
                                active={active === 'add_devices'}
                                onPress={() => setActive('add_devices')}
                            />
                            <RNPDrawer.Item
                                label="Cerrar sesión"
                                active={active === 'logout'}
                                onPress={() => setActive('logout')}
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
