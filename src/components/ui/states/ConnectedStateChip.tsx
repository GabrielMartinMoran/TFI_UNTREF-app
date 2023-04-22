import React from 'react';
import { PALLETE } from '../../../pallete';
import { StateChip } from './StateChip';

export type ConnectedStateChipProps = {
    isConnected: boolean;
    onPress?: () => void;
};

export const ConnectedStateChip: React.FC<ConnectedStateChipProps> = ({ isConnected, onPress = undefined }) => {
    return (
        <StateChip
            icon={isConnected ? 'wifi' : 'wifi-off'}
            text={isConnected ? 'Conectado' : 'Desconectado'}
            color={isConnected ? PALLETE.INFO : PALLETE.SECONDARY_TEXT}
            onPress={onPress}
        />
    );
};
