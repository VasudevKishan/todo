import {createContext, useEffect, useState} from "react";
import {Task, TaskContextProps} from "./helper";

export const TaskContext = createContext<TaskContextProps | undefined>(
    undefined
);

export const TaskProvider: React.FC<{children: React.ReactNode}> = ({
    children,
}) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    useEffect(() => {
        const currentTasks = localStorage.getItem("tasks");

        if (currentTasks) {
            setTasks(JSON.parse(currentTasks));
        } else {
            const defaultTasks: Task[] = [
                {
                    id: 1,
                    title: "Task 1",
                    description: "Task 1 description with somewhat long test",
                    completed: false,
                    starred: true,
                },
                {
                    id: 2,
                    title: "Task 2",
                    description: "Task 2 description with somewhat long test",
                    completed: true,
                    starred: false,
                },
                {
                    id: 3,
                    title: "Task 3",
                    completed: true,
                    starred: false,
                },
            ];
            setTasks(defaultTasks);
            localStorage.setItem("tasks", JSON.stringify(defaultTasks));
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks, isInitialized]);

    const addTask = (task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    };

    const removeTask = (id: number) => {
        setTasks((prevTask) => prevTask.filter((task) => task.id !== id));
    };

    const toggleTaskCompletion = (id: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? {...task, completed: !task.completed} : task
            )
        );
    };

    const toggleStar = (id: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? {...task, starred: !task.starred} : task
            )
        );
    };

    const generateUniqueId = (): number => {
        return tasks.length > 0
            ? Math.max(...tasks.map((task) => task.id)) + 1
            : 1;
    };

    const selectTask = (task: Task) => {
        setSelectedTask({...task});
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                selectedTask,
                addTask,
                removeTask,
                toggleTaskCompletion,
                toggleStar,
                generateUniqueId,
                selectTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
