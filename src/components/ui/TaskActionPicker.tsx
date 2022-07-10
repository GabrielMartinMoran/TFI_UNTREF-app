import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { Task } from '../../models/scheduling/task';

export type TaskActionPickerProps = {
    value: string;
    onChange: (taskAction: string) => void;
};

export const TaskActionPicker: React.FC<TaskActionPickerProps> = ({
    value,
    onChange,
}) => {
    const toggleTaskAction = () => {
        const taskAction =
            value === Task.ACTIONS.TURN_DEVICE_ON
                ? Task.ACTIONS.TURN_DEVICE_OFF
                : Task.ACTIONS.TURN_DEVICE_ON;
        onChange(taskAction);
    };

    const renderWeekdayButtons = () => {
        return [Task.ACTIONS.TURN_DEVICE_OFF, Task.ACTIONS.TURN_DEVICE_ON].map(
            (taskAction: string) => (
                <TouchableHighlight
                    key={taskAction}
                    onPress={() => toggleTaskAction()}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            backgroundColor:
                                value === taskAction ? 'purple' : 'gray',
                        }}
                    >
                        {taskAction === Task.ACTIONS.TURN_DEVICE_OFF
                            ? 'Apagar dispositivo'
                            : 'Encender dispositivo'}
                    </Text>
                </TouchableHighlight>
            )
        );
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
