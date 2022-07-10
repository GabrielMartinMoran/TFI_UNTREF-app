import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { DailyTask } from '../../models/scheduling/daily-task';
import { TimePickerModal } from 'react-native-paper-dates';
import { WeekdaysPicker } from '../ui/WeekdaysPicker';
import { Weekdays } from '../../utils/weekdays';
import { TaskActionPicker } from '../ui/TaskActionPicker';

export type EditDailyTaskProps = {
    initialValue: DailyTask;
    onSubmit: (task: DailyTask) => void;
    onCancel: () => void;
};

export const EditDailyTask: React.FC<EditDailyTaskProps> = ({
    initialValue,
    onSubmit,
    onCancel,
}) => {
    const [task, setTask] = useState(initialValue.clone());
    const [showTimeModal, setShowTimeModal] = useState(false);

    const handleTaskActionChange = (taskAction: string) => {
        task.action = taskAction;
        setTask(task.clone());
    };

    return (
        <View>
            <Text>Editar tarea diaria</Text>
            <TaskActionPicker
                value={task.action}
                onChange={handleTaskActionChange}
            />
            <Button
                title={`${task.moment.getHours()}:${task.moment.getMinutes()}`}
                onPress={() => setShowTimeModal(true)}
            />
            <TimePickerModal
                locale="es"
                visible={showTimeModal}
                hours={task.moment.getHours()}
                minutes={task.moment.getMinutes()}
                label="Fijar hora"
                cancelLabel="Cancelar"
                confirmLabel="Guardar"
                animationType="fade"
                onDismiss={() => setShowTimeModal(false)}
                onConfirm={({ hours, minutes }) => {
                    task.moment.setHours(hours);
                    task.moment.setMinutes(minutes);
                    setShowTimeModal(false);
                    setTask(task.clone());
                }}
            />

            <WeekdaysPicker
                value={task.weekdays}
                onChange={(weekdays: Array<number>) => {
                    task.weekdays = weekdays;
                    setTask(task.clone());
                }}
            />

            <Button title="Aceptar" onPress={() => onSubmit(task)} />
            <Button title="Cancelar" onPress={() => onCancel()} />
        </View>
    );
};
