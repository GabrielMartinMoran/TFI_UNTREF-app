import React from 'react';
import { View } from 'react-native';

export type SpacerProps = {
    margin?: string;
};

export const Spacer: React.FC<SpacerProps> = ({ margin = '1rem' }) => {
    return <View style={{ margin: margin }} />;
};
