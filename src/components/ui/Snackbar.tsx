import React, { useEffect, useState } from 'react';
import { Snackbar as RNPSnackbar } from 'react-native-paper';
import { PALLETE } from '../../pallete';
import { AppContext } from '../../app-context';

export type SnackbarProps = {
    appContext: AppContext;
};

export const Snackbar: React.FC<SnackbarProps> = ({ appContext }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const setContent = (message: string | null) => {
        setMessage(message);
        setVisible(message !== null);
    };

    useEffect(() => {
        appContext.setSnackbarContentCallback = setContent;

        return () => {
            appContext.setSnackbarContentCallback = (message: string | null) => {};
        };
    }, []);

    return (
        <RNPSnackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            action={{
                label: 'Descartar',
                onPress: () => {
                    setVisible(false);
                },
            }}
        >
            {message}
        </RNPSnackbar>
    );
};
