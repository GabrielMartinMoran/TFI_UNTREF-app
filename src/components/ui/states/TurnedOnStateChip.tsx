import React from 'react';
import { PALLETE } from '../../../pallete';
import { StateChip } from './StateChip';

export type TurnedOnStateChipProps = {
    isTurnedOn: boolean;
    isConnected: boolean;
    onPress?: () => void;
};

export const TurnedOnStateChip: React.FC<TurnedOnStateChipProps> = ({
    isTurnedOn,
    isConnected,
    onPress = undefined,
}) => {
    return (
        <StateChip
            icon={isConnected ? (isTurnedOn ? 'lightbulb' : 'lightbulb-outline') : 'wifi-off'}
            text={isConnected ? (isTurnedOn ? 'Encendido' : 'Apagado') : 'Desconocido'}
            color={isConnected ? (isTurnedOn ? PALLETE.ACCENT : PALLETE.SECONDARY_TEXT) : PALLETE.ERROR}
            onPress={onPress}
        />
    );
};
