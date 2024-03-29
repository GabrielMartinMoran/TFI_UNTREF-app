import React, { useState } from 'react';
import { View } from 'react-native';
import { CONFIG } from '../../config';
import { ChipButton } from './ChipButton';
import { isMobile } from '../../utils/platform-checker';
export type TimeRangePickerProps = {
    onChange: (minutesRange: number) => void;
};

const ranges = [
    CONFIG.TIME_RANGES['5_MINUTES'],
    CONFIG.TIME_RANGES['30_MINUTES'],
    CONFIG.TIME_RANGES['1_HOUR'],
    CONFIG.TIME_RANGES['1_DAY'],
    CONFIG.TIME_RANGES['15_DAYS'],
    CONFIG.TIME_RANGES['30_DAYS'],
];

export const TimeRangePicker: React.FC<TimeRangePickerProps> = ({ onChange }) => {
    const [range, setRange] = useState(ranges[0]);

    const renderRanges = () => {
        return ranges.map((_range: any) => (
            <ChipButton
                title={_range.display}
                fontSize={isMobile() ? "0.7rem" : "0.7rem"}
                width={isMobile() ? '25px' : '55px'}
                key={_range.display}
                onPress={() => {
                    setRange(_range);
                    onChange(_range.minutes);
                }}
                focused={range === _range}
            />
        ));
    };

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
            }}
        >
            {renderRanges()}
        </View>
    );
};
