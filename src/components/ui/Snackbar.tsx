import React, { ReactNode, useEffect, useState } from 'react';
import { Snackbar as RNPSnackbar } from 'react-native-paper';
import { AppContext } from '../../app-context';
import { Text, View } from 'react-native';
import { PALLETE } from '../../pallete';
import { MessageType } from '../../models/message-type';
import { v4 as uuidv4 } from 'uuid';

export type SnackbarProps = {
    appContext: AppContext;
};

export const Snackbar: React.FC<SnackbarProps> = ({ appContext }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState<any | null>(null);

    const [messageId, setMessageId] = useState<string | null>(null);

    const getMessageTypeColor = (messageType: MessageType) => {
        if (messageType === MessageType.SUCCESS) return PALLETE.SUCCESS;
        if (messageType === MessageType.ERROR) return PALLETE.ERROR;
        return PALLETE.BUTTONS_TEXT;
    };

    const showMessage = (message: string | null, messageType: MessageType = MessageType.DEFAULT): string => {
        setMessage(
            message ? (
                <Text
                    style={{
                        color: getMessageTypeColor(messageType),
                    }}
                >
                    {messageType === MessageType.ERROR ? '× ' : null}
                    {messageType === MessageType.SUCCESS ? '✓ ' : null}
                    {message}
                </Text>
            ) : null
        );
        setVisible(true);
        const messageId = uuidv4();
        setMessageId(messageId);
        return messageId;
    };

    const hideMessage = (msgId: string) => {
        if (messageId !== msgId) return;
        setMessage(null);
        setVisible(false);
        setMessageId(null);
    };

    useEffect(() => {
        appContext.showSnackbarMessageCallback = showMessage;
        appContext.hideSnackbarMessageCallback = hideMessage;

        return () => {
            appContext.showSnackbarMessageCallback = (message: string | null, messageType?: MessageType): string => {};
            appContext.hideSnackbarMessageCallback = (messageId: string) => {};
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
