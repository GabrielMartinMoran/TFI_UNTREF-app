import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { Weekdays } from '../../utils/weekdays';
import { ChipButton } from './ChipButton';

export type WeekdaysPickerProps = {
    value: Array<number>;
    onChange: (weekdays: Array<number>) => void;
};

export const WeekdaysPicker: React.FC<WeekdaysPickerProps> = ({ value, onChange }) => {
    const toggleWeekday = (weekday: number) => {
        const weekdays = [...value];
        const index = weekdays.indexOf(weekday);
        if (index !== -1) {
            weekdays.splice(index, 1);
        } else {
            weekdays.push(weekday);
            weekdays.sort();
        }
        onChange(weekdays);
    };

    const weekdayActive = (weekday: number): boolean => {
        return value.indexOf(weekday) !== -1;
    };

    const renderWeekdayButtons = () => {
        return Weekdays.all().map((weekday: number) => (
            <ChipButton
                title={Weekdays.mapShort(weekday)}
                width="2.5rem"
                key={weekday}
                onPress={() => toggleWeekday(weekday)}
                focused={weekdayActive(weekday)}
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
            {renderWeekdayButtons()}
        </View>
    );
};
