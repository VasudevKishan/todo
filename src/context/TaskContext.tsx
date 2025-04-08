import {createContext, useEffect, useState} from "react";
import {Task, TaskContextProps} from "./helper";

export const TaskContext = createContext<TaskContextProps | undefined>(
    undefined
);

export const TaskProvider: React.FC<{children: React.ReactNode}> = ({
    children,
}) => {
    const [userState, setUserState] = useState<"new" | "edit">("new");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task>(tasks[0]);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    useEffect(() => {
        const currentTasks = localStorage.getItem("tasks");

        if (currentTasks) {
            setTasks(JSON.parse(currentTasks));
            setFilteredTasks(JSON.parse(currentTasks));
        } else {
            setTasks([]);
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks, isInitialized]);

    const addTask = (task: Task) => {
        if (tasks.some((task) => task.id === selectedTask.id)) {
            setTasks((prevTasks) =>
                prevTasks.filter((t) => t.id !== task.id).concat(task)
            );
        } else {
            setTasks((prevTasks) => [...prevTasks, task]);
        }
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

    const generateUniqueId = (): number => {
        return tasks.length > 0
            ? Math.max(...tasks.map((task) => task.id)) + 1
            : 1;
    };

    const selectTask = (task: Task) => {
        setSelectedTask({...task});
    };
    const changeState = (state: "new" | "edit") => {
        setUserState(state);
    };

    const filterByStarred = () => {
        // const filteredtasks = tasks.filter((task) => task.starred);
        console.log(filteredTasks);
        setFilteredTasks(tasks.filter((task) => task.starred));
    };

    const clearFilter = () => {
        setFilteredTasks(tasks);
    };

    return (
        <TaskContext.Provider
            value={{
                filteredTasks,
                selectedTask,
                addTask,
                removeTask,
                toggleTaskCompletion,
                generateUniqueId,
                selectTask,
                userState,
                changeState,
                filterByStarred,
                clearFilter,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
