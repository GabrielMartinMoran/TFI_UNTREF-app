import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { DailyTask } from '../../models/scheduling/daily-task';
import { TimePickerModal } from 'react-native-paper-dates';
import { WeekdaysPicker } from '../ui/WeekdaysPicker';
import { TaskActionPicker } from '../ui/TaskActionPicker';
import { Button, ButtonType } from '../ui/Button';
import { Spacer } from '../ui/Spacer';
import { SectionTitle } from '../ui/SectionTitle';

export type EditDailyTaskProps = {
    initialValue: DailyTask;
    onSubmit: (task: DailyTask) => void;
    onCancel: () => void;
};

export const EditDailyTask: React.FC<EditDailyTaskProps> = ({ initialValue, onSubmit, onCancel }) => {
    const [task, setTask] = useState(initialValue.clone());
    const [showTimeModal, setShowTimeModal] = useState(false);

    const handleTaskActionChange = (taskAction: string) => {
        task.action = taskAction;
        setTask(task.clone());
    };

    return (
        <View>
            <SectionTitle text="Editar tarea diaria" />
            <Spacer />
            <TaskActionPicker value={task.action} onChange={handleTaskActionChange} />
            <Spacer />
            <Button
                title={`${task.moment.getHours()}:${task.moment.getMinutes()}`}
                onPress={() => setShowTimeModal(true)}
            />
            <Spacer />
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
            <Spacer />
            <WeekdaysPicker
                value={task.weekdays}
                onChange={(weekdays: Array<number>) => {
                    task.weekdays = weekdays;
                    setTask(task.clone());
                }}
            />
            <Spacer />
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Button
                    title="Guardar"
                    icon="check"
                    buttonType={ButtonType.CHECK}
                    width="12rem"
                    onPress={() => onSubmit(task)}
                />
                <Spacer />
                <Button
                    title="Descartar"
                    icon="cancel"
                    buttonType={ButtonType.CANCEL}
                    width="12rem"
                    onPress={() => onCancel()}
                />
            </View>
        </View>
    );
};
