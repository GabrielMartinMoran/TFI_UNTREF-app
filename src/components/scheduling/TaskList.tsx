import React from 'react';
import { View } from 'react-native';
import { Task } from '../../models/scheduling/task';
import { DailyTask } from '../../models/scheduling/daily-task';
import { DailyTaskComponent } from './DailyTaskComponent';
import { TaskComponent } from './TaskComponent';

export type TaskListProps = {
    tasks: Array<Task>;
    onTaskPress: (task: Task) => void;
};

export const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskPress }) => {
    return (
        <View>
            {tasks.map((task: Task, i: number) =>
                task instanceof DailyTask ? (
                    <DailyTaskComponent
                        key={`task-${i}`}
                        task={task}
                        onPress={onTaskPress}
                    />
                ) : (
                    <TaskComponent
                        key={`task-${i}`}
                        task={task}
                        onPress={onTaskPress}
                    />
                )
            )}
        </View>
    );
};
