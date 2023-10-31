import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { Task } from '../../models/scheduling/task';
import { ChipButton } from './ChipButton';

export type TaskActionPickerProps = {
    value: string;
    onChange: (taskAction: string) => void;
};

export const TaskActionPicker: React.FC<TaskActionPickerProps> = ({ value, onChange }) => {
    const toggleTaskAction = () => {
        const taskAction =
            value === Task.ACTIONS.TURN_DEVICE_ON ? Task.ACTIONS.TURN_DEVICE_OFF : Task.ACTIONS.TURN_DEVICE_ON;
        onChange(taskAction);
    };

    const renderWeekdayButtons = () => {
        return [Task.ACTIONS.TURN_DEVICE_OFF, Task.ACTIONS.TURN_DEVICE_ON].map((taskAction: string) => (
            <ChipButton
                title={taskAction === Task.ACTIONS.TURN_DEVICE_OFF ? 'Apagar dispositivo' : 'Encender dispositivo'}
                key={taskAction}
                onPress={() => toggleTaskAction()}
                focused={value === taskAction}
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
