import React from "react";
import {Task} from "../../context/helper";
import styles from "./styles.module.css";

interface TaskItemProps {
    task: Task;
    onChecked: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({task, onChecked}) => {
    return (
        <div
            className={`${styles.item} ${
                task.completed ? styles.strikeThrough : ""
            }`}
        >
            <input type="checkbox" id={task.id.toString()} />
            <span
                className={`material-icons ${styles.check}`}
                onClick={() => {
                    onChecked(task.id);
                }}
            >
                {task.completed ? "check_circle" : "radio_button_unchecked"}
            </span>
            <label htmlFor={task.id.toString()}>{task.title}</label>

            <span className={styles.actionIcons}>
                {task.completed ? (
                    <span className={`material-icons  ${styles.delete}`}>
                        delete
                    </span>
                ) : (
                    <>
                        <span className={`material-icons ${styles.editIcon}`}>
                            mode
                        </span>
                        <span
                            className={`material-icons ${styles.starIcon}
                    ${task.starred ? styles.starred : styles.notStarred}
                `}
                        >
                            {task.starred ? "star" : "star_border"}
                        </span>
                    </>
                )}
            </span>
        </div>
    );
};
