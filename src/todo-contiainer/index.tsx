import React, {forwardRef} from "react";
import styles from "./styles.module.css";
import {ActionButton} from "../components/ActionButton/ActionButton";

import {useCurrentAction} from "../hooks/useCurrentAction";
import {useTasks} from "../hooks/useTasks";
import {TaskItem} from "../components/TaskItem.tsx";

const TodoContainer: React.FC = forwardRef<HTMLDivElement>((_, ref) => {
    const {changeAction} = useCurrentAction();
    const {
        tasks,
        addTask,
        removeTask,
        toggleTaskCompletion,
        toggleStar,
        selectTask,
        selectedTask,
        generateUniqueId,
    } = useTasks();

    // const {tasks} = useTasks();

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

                <ul className={styles.TaskList}>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <TaskItem
                                task={task}
                                onChecked={toggleTaskCompletion}
                                onEdit={() => {
                                    selectTask(task.id);
                                    changeAction("edit");
                                }}
                                onDetail={() => {
                                    selectTask(task.id);
                                    changeAction("detail");
                                }}
                            />
                        </li>
                    ))}
                </ul>

                <ActionButton
                    varient="primary"
                    onClick={() => {
                        const newTask = {
                            id: generateUniqueId(),
                            title: "",
                            description: "",
                            completed: false,
                            starred: false,
                        };
                        selectTask(newTask.id);
                        changeAction("edit");
                    }}
                    className={styles.addBtn}
                >
                    Add Task
                </ActionButton>
            </div>

            <div
                className={`${styles.slide} ${styles.taskDetail} ${styles["task-detail"]}`}
            >
                <div className={styles.expandTitle}>
                    <h2 className={styles.title}>Task Details</h2>
                </div>

                <div className={styles.detailHeader}>
                    <h2 className={styles.taskTitle}>{selectedTask?.title}</h2>
                    <div className={styles.icons}>
                        {selectedTask?.starred ? (
                            <span className={`material-icons ${styles.icon}`}>
                                star
                            </span>
                        ) : (
                            ""
                        )}

                        {selectedTask?.completed ? (
                            <span className={`material-icons ${styles.icon}`}>
                                check_circle
                            </span>
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                <div className={styles.detailContent}>
                    <hr className={styles.divider}></hr>
                    <p className={styles.taskDescription}>
                        {selectedTask?.description ? (
                            selectedTask?.description
                        ) : (
                            <span
                                style={{
                                    textAlign: "center",
                                    width: "100%",
                                }}
                            >
                                No Note
                            </span>
                        )}
                    </p>
                </div>

                <div className={styles.expandFooter}>
                    <ActionButton
                        className={styles.backBtn}
                        varient="secondary"
                        onClick={() => changeAction("view")}
                    >
                        <span className="material-icons">arrow_back_ios</span>
                    </ActionButton>
                </div>
            </div>
        </main>
    );
});

export default TodoContainer;
