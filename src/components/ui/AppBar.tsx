import React, { useEffect, useState } from 'react';
import { Appbar, IconButton } from 'react-native-paper';
import { PALLETE } from '../../pallete';
import { AppContext } from '../../app-context';
import { CONFIG } from '../../config';
import { useAppNavigate } from '../../hooks/use-app-navigate';
import { parseStyle } from '../../utils/styles-parser';
import { isMobile } from '../../utils/platform-checker';

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
        if (appContext.isDrawerShown) {
            appContext.hideDrawerCallback();
        } else {
            appContext.showDrawerCallback();
        }
    };

    return (
        <Appbar.Header
            style={parseStyle(
                {
                    height: '50px',
                    display: 'flex',
                    position: 'fixed',
                    zIndex: 2,
                    width: '100%',
                    backgroundColor: PALLETE.PRIMARY,
                },
                {
                    display: 'flex',
                    position: undefined,
                    height: '25px',
                    marginTop: 0,
                    width: '200px',
                }
            )}
        >
            <IconButton icon="menu" size={30} onPress={menuPress} color={PALLETE.BUTTONS_TEXT} />
            <Appbar.Content
                title={locationTitle}
                titleStyle={parseStyle(
                    { color: PALLETE.BUTTONS_TEXT, paddingTop: '0.2rem' },
                    { paddingTop: -20, margin: 0 }
                )}
            />
        </Appbar.Header>
    );
};
