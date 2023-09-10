import React from 'react';
import { Text } from 'react-native';

export type SectionTitleProps = {
    text: string;
};

export const SectionTitle: React.FC<SectionTitleProps> = ({ text }) => {
    return (
        <Text style={{ marginTop: '1rem', marginBottom: '0.5rem', fontSize: '1.7rem', fontWeight: '500' }}>{text}</Text>
    );
};
