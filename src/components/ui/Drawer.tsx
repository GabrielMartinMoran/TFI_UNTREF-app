import React, { useEffect, useState } from 'react';
import { PALLETE } from '../../pallete';
import { AppContext } from '../../app-context';
import { CONFIG } from '../../config';
import { useAppNavigate } from '../../hooks/use-app-navigate';
import { Drawer as RNPDrawer } from 'react-native-paper';
import { TouchableWithoutFeedback, View } from 'react-native';
import { ROUTES } from '../../routes';
import { AuthRepository } from '../../repositories/web-api/auth-repository';
import { parseStyle } from '../../utils/styles-parser';
import { isMobile } from '../../utils/platform-checker';

export type DrawerProps = {
    appContext: AppContext;
};

export const Drawer: React.FC<DrawerProps> = ({ appContext }) => {
    const authRepository = appContext.getRepository(AuthRepository) as AuthRepository;

    const [visible, setVisible] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { navigateTo } = useAppNavigate(appContext);

    const showDrawer = async () => {
        await checkAuthentication();
        setVisible(true);
    };

    const hideDrawer = () => {
        setVisible(false);
    };

    const checkAuthentication = async () => {
        setIsAuthenticated(await authRepository.isLogged());
    };

    useEffect(() => {
        appContext.showDrawerCallback = showDrawer;
        appContext.hideDrawerCallback = hideDrawer;

        checkAuthentication();

        return () => {
            appContext.showDrawerCallback = () => {};
            appContext.hideDrawerCallback = () => {};
        };
    }, []);

    return (
        <>
            {visible ? (
                <View
                    style={parseStyle(
                        {
                            display: 'flex',
                            flexDirection: 'row',
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            zIndex: 1,
                            top: '50px',
                        },
                        {
                            top: '25px',
                        }
                    )}
                >
                    <View
                        style={parseStyle(
                            {
                                height: '100%',
                                backgroundColor: PALLETE.BACKGROUND,
                                shadowColor: PALLETE.DRAWER_SHADOW,
                                shadowOffset: { width: 1, height: 0 },
                                shadowOpacity: 0.4,
                                shadowRadius: 2,
                                width: '220px',
                            },
                            {
                                elevation: 13,
                                width: '500px',
                                height: '500px',
                            }
                        )}
                    >
                        <RNPDrawer.Section title="Administrador de dispositivos">
                            {isAuthenticated ? (
                                <>
                                    <RNPDrawer.Item
                                        label="Resumen general"
                                        onPress={() => {
                                            appContext.hideDrawerCallback();
                                            navigateTo({ route: ROUTES.home });
                                        }}
                                    />
                                    <RNPDrawer.Item
                                        label="Mis dispositivos"
                                        onPress={() => {
                                            appContext.hideDrawerCallback();
                                            navigateTo({ route: ROUTES.myDevices });
                                        }}
                                    />
                                    <RNPDrawer.Item
                                        label="Agregar dispositivo"
                                        onPress={() => {
                                            appContext.hideDrawerCallback();
                                            navigateTo({ route: ROUTES.searchDevices });
                                        }}
                                    />
                                    <RNPDrawer.Item
                                        label="Cerrar sesión"
                                        onPress={() => {
                                            appContext.hideDrawerCallback();
                                            navigateTo({ route: ROUTES.logout });
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <RNPDrawer.Item
                                        label="Iniciar sesión"
                                        onPress={() => {
                                            appContext.hideDrawerCallback();
                                            navigateTo({ route: ROUTES.login });
                                        }}
                                    />
                                    <RNPDrawer.Item
                                        label="Registrarse"
                                        onPress={() => {
                                            appContext.hideDrawerCallback();
                                            navigateTo({ route: ROUTES.register });
                                        }}
                                    />
                                </>
                            )}
                        </RNPDrawer.Section>
                    </View>
                    <TouchableWithoutFeedback onPress={appContext.hideDrawerCallback}>
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
