import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { AppContext } from '../../app-context';
import { SchedulerRepository } from '../../repositories/web-api/scheduler-repository';
import { DailyTask } from '../../models/scheduling/daily-task';
import { Task } from '../../models/scheduling/task';
import { Checkbox } from 'react-native-paper';
import { EditTask } from '../scheduling/EditTask';
import { EditDailyTask } from '../scheduling/EditDailyTask';
import { useParams } from 'react-router-native';
import { useAppNavigate } from '../../hooks/use-app-navigate';
import { ROUTES } from '../../routes';
import { Button, ButtonType } from '../ui/Button';
import { Spacer } from '../ui/Spacer';
import { SectionTitle } from '../ui/SectionTitle';

export type EditTaskViewProps = {
    appContext: AppContext;
};

export const EditTaskView: React.FC<EditTaskViewProps> = ({ appContext }) => {
    const schedulerRepository = appContext.getRepository(SchedulerRepository) as SchedulerRepository;

    const { deviceId } = useParams();
    const { navigateTo } = useAppNavigate(appContext);

    const tasks = appContext.getSharedState('tasks') as Array<Task>;
    const editedTaskIndex = appContext.getSharedState('editedTaskIndex') as number | null;

    const [isDailyTask, setIsDailyTask] = useState(
        editedTaskIndex !== null ? tasks[editedTaskIndex] instanceof DailyTask : false
    );
    const [task, setTask] = useState(
        editedTaskIndex !== null ? tasks[editedTaskIndex].clone() : isDailyTask ? DailyTask.new() : Task.new()
    );

    const goToScheduler = () => {
        navigateTo({
            route: ROUTES.deviceScheduler,
            params: { ':deviceId': deviceId! },
        });
    };

    const onSubmit = async (task: Task) => {
        if (editedTaskIndex === null) {
            // This is a new task
            tasks.push(task);
        } else {
            // It's editing a already existent task
            tasks[editedTaskIndex] = task;
        }
        try {
            await schedulerRepository.update(deviceId as string, tasks);
            goToScheduler();
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async () => {
        try {
            // We copy the list in case of an error on the request
            const _tasks = [...tasks];
            _tasks.splice(editedTaskIndex as number, 1);
            await schedulerRepository.update(deviceId as string, _tasks);
            goToScheduler();
        } catch (e) {
            console.log(e);
        }
    };

    const toggleDailyTaskEditor = () => {
        setTask(isDailyTask ? (task as DailyTask).toTask() : DailyTask.fromTask(task));
        setIsDailyTask(!isDailyTask);
    };

    return (
        <View>
            <SectionTitle text={isDailyTask ? 'Editar tarea diaria' : 'Editar tarea programada'} />
            <Spacer margin="0.5rem" />
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Checkbox status={isDailyTask ? 'checked' : 'unchecked'} onPress={toggleDailyTaskEditor} />
                <Text>¿Se repite esta tarea varios días a la semana?</Text>
            </View>
            <Spacer margin="0.5rem" />
            {isDailyTask ? (
                <EditDailyTask initialValue={task as DailyTask} onSubmit={onSubmit} onCancel={() => goToScheduler()} />
            ) : (
                <EditTask initialValue={task} onSubmit={onSubmit} onCancel={() => goToScheduler()} />
            )}
            {editedTaskIndex !== null ? (
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Spacer />
                    <Button
                        title="Eliminar"
                        icon="delete"
                        buttonType={ButtonType.DELETE}
                        width="12rem"
                        onPress={() => handleDelete()}
                    />
                </View>
            ) : null}
        </View>
    );
};
