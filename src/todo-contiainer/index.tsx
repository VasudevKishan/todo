import React, {forwardRef} from "react";
import styles from "./styles.module.css";
import {ActionButton} from "../components/ActionButton/ActionButton";

import {useCurrentAction} from "../hooks/useCurrentAction";
import {useTasks} from "../hooks/useTasks";
import {TaskItem} from "../components/TaskItem.tsx";

const TodoContainer: React.FC = forwardRef<HTMLDivElement>((_, ref) => {
    const {changeAction} = useCurrentAction();
    // const {tasks, addTask, removeTask, toggleTaskCompletion, toggleStar} =
    //     useTasks();

    const {tasks} = useTasks();

    return (
        <main className={styles.container} ref={ref}>
            <div className={` ${styles.slide} ${styles["add-task"]}`}>
                <h2 className={styles.title}>Add Task</h2>
                <ActionButton
                    className={styles.backBtn}
                    varient="secondary"
                    onClick={() => {
                        console.log("add new task");
                        changeAction("view");
                    }}
                >
                    <span className="material-icons">arrow_back_ios</span>
                </ActionButton>
                <ActionButton
                    className={styles.addBtn}
                    varient="primary"
                    onClick={() => {
                        console.log("added successfully");
                        changeAction("view");
                    }}
                >
                    Add
                </ActionButton>
            </div>

            <div className={`${styles.slide} ${styles["view-task"]}`}>
                <h2 className={styles.title}>Tasks</h2>
                {/* {tasks.map((task) => (
                    <>
                        <span>{task.title}</span>
                        <br />
                        <span>{task.description}</span>
                        <br />
                        <span>{task.starred}</span>
                        <br />
                        <span>{task.completed}</span>
                    </>
                ))} */}

                <ul className={styles.TaskList}>
                    {tasks.map((task) => (
                        <li>
                            <TaskItem task={task} />
                        </li>
                    ))}
                </ul>

                <ActionButton
                    varient="primary"
                    onClick={() => changeAction("edit")}
                    className={styles.addBtn}
                >
                    Add Task
                </ActionButton>
            </div>

            <div className={`${styles.slide} ${styles["task-detail"]}`}>
                <h2 className={styles.title}>Task Detail</h2>
                <ActionButton
                    className={styles.backBtn}
                    varient="secondary"
                    onClick={() => changeAction("view")}
                >
                    <span className="material-icons">arrow_back_ios</span>
                </ActionButton>
            </div>
        </main>
    );
});

export default TodoContainer;
