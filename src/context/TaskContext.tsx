import {createContext, useState} from "react";
import {Task, TaskContextProps} from "./helper";

export const TaskContext = createContext<TaskContextProps | undefined>(
    undefined
);

export const TaskProvider: React.FC<{children: React.ReactNode}> = ({
    children,
}) => {
    const currentTasks = localStorage.getItem("tasks");
    let myTask: Task[] = [];
    if (currentTasks && currentTasks !== undefined) {
        myTask = JSON.parse(currentTasks);
    } else {
        myTask = [
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
        ];
        localStorage.setItem("tasks", JSON.stringify(myTask));
    }

    const [tasks, setTasks] = useState<Task[]>(myTask);

    const addTask = (task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const removeTask = (id: number) => {
        setTasks((prevTask) => prevTask.filter((task) => task.id !== id));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const toggleTaskCompletion = (id: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? {...task, completed: !task.completed} : task
            )
        );
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const toggleStar = (id: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? {...task, starred: !task.starred} : task
            )
        );
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const generateUniqueId = (): number => {
        return tasks.length > 0
            ? Math.max(...tasks.map((task) => task.id)) + 1
            : 1;
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                removeTask,
                toggleTaskCompletion,
                toggleStar,
                generateUniqueId,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
