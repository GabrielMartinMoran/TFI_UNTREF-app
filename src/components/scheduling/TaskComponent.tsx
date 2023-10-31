import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { Task } from '../../models/scheduling/task';

export type TaskComponentProps = {
    task: Task;
    onPress: (task: Task) => void;
};

export const TaskComponent: React.FC<TaskComponentProps> = ({
    task,
    onPress,
}) => {
    return (
        <TouchableHighlight onPress={() => onPress(task)}>
            <View style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                <Text>
                    {task.isTurningOn() ? 'Encendido' : 'Apagado'} configurado
                    el <b>{task.moment.toLocaleDateString()}</b> a las{' '}
                    <b>
                        {('0' + task.moment.getHours().toString()).slice(-2)}:
                        {('0' + task.moment.getMinutes().toString()).slice(-2)}
                    </b>
                </Text>
            </View>
        </TouchableHighlight>
    );
};
