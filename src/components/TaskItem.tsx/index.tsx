import React from "react";
import {Task} from "../../context/helper";
import styles from "./styles.module.css";

interface TaskItemProps {
    task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({task}) => {
    return (
        <div key={task.id} className={styles.item}>
            <input type="checkbox" id={task.id.toString()} />
            <span className={`material-icons ${styles.check}`}>
                {task.completed ? "check_circle" : "radio_button_unchecked"}
            </span>
            <label htmlFor={task.id.toString()}>{task.title}</label>

            <span className={`material-icons ${styles.icon}`}>
                {task.starred ? "star" : "star_border"}
            </span>
        </div>
    );
};
