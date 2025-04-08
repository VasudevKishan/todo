import {useContext} from "react";
import {TaskContextProps} from "../context/helper";
import {TaskContext} from "../context/TaskContext";

export const useTasks = (): TaskContextProps => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
};
