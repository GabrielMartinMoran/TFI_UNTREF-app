import React, { useEffect, useState } from 'react';
import { Appbar, IconButton, Button as RNPButton, Text as RNPText } from 'react-native-paper';
import { PALLETE } from '../../pallete';
import { AppContext } from '../../app-context';
import { CONFIG } from '../../config';
import { useAppNavigate } from '../../hooks/use-app-navigate';
import { Icon } from 'react-native-paper/lib/typescript/components/List/List';

export type AppBarProps = {
    appContext: AppContext;
};

export const AppBar: React.FC<AppBarProps> = ({ appContext }) => {
    const { navigateBack, isRoot } = useAppNavigate(appContext);

    const [locationTitle, setLocationTitle] = useState(CONFIG.DEFAULT_LOCATION_NAME);

    const updateLocationTitle = (title: string | undefined) => {
        setLocationTitle(title ?? CONFIG.DEFAULT_LOCATION_NAME);
    };

    useEffect(() => {
        appContext.locationTitleChangeCallback = updateLocationTitle;

        return () => {
            appContext.locationTitleChangeCallback = (title: string | undefined) => {};
        };
    }, []);

    const menuPress = () => {
        appContext.showDrawerCallback();
    };

    return (
        <Appbar.Header
            style={{
                height: CONFIG.STYLES.APPBAR_HEIGHT,
                display: 'flex',
                flex: 1,
                backgroundColor: PALLETE.PRIMARY,
            }}
        >
            <IconButton icon="menu" size={30} onPress={menuPress} color={PALLETE.BUTTONS_TEXT} />
            <Appbar.Content title={locationTitle} titleStyle={{ color: PALLETE.BUTTONS_TEXT, paddingTop: '0.2rem' }} />
        </Appbar.Header>
    );
};
