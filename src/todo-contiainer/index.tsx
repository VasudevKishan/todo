import React, {forwardRef, useEffect, useState} from "react";
import styles from "./styles.module.css";
import {ActionButton} from "../components/ActionButton/ActionButton";

import {useCurrentAction} from "../hooks/useCurrentAction";
import {useTasks} from "../hooks/useTasks";
import {TaskItem} from "../components/TaskItem.tsx";
import {Task} from "../context/helper.tsx";

const TodoContainer: React.FC = forwardRef<HTMLDivElement>((_, ref) => {
    const {changeAction} = useCurrentAction();
    const {
        tasks,
        addTask,
        removeTask,
        toggleTaskCompletion,
        selectTask,
        selectedTask,
        generateUniqueId,
        changeState,
        userState,
    } = useTasks();

    const [taskTitle, setTaskTitle] = useState<string>("");
    const [taskDescription, setTaskDescription] = useState<string>("");
    const [taskStarred, setTaskStarred] = useState<boolean>(false);

    const [animate, setAnimate] = useState<boolean>(false);
    useEffect(() => {
        if (selectedTask) {
            setTaskTitle(selectedTask.title || "");
            setTaskDescription(selectedTask.description || "");
            setTaskStarred(selectedTask.starred);
        }
    }, [selectedTask]);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!taskTitle.trim()) {
            console.log("title is required");
            return;
        }
        console.log("Task added : ", {taskTitle, taskDescription, taskStarred});

        const newTask: Task = {
            id: selectedTask.id,
            title: taskTitle,
            description: taskDescription,
            starred: taskStarred,
            completed: false,
        };
        addTask(newTask);

        changeAction("view");
    };

    return (
        <main className={styles.container} ref={ref}>
            <div className={` ${styles.slide} ${styles["add-task"]}`}>
                <h2 className={styles.title}>Add Task</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className={styles.taskForm}>
                        <div>
                            <input
                                type="text"
                                name="taskTitle"
                                id="taskTitle"
                                required
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                            />
                            <label
                                htmlFor="taskTitle"
                                style={{display: "none"}}
                            >
                                Title
                            </label>
                            <span
                                className={`material-icons ${
                                    styles.formStarBtn
                                } ${animate ? styles.rotateOnClick : ""}`}
                                onClick={() => {
                                    setAnimate(true);
                                    setTaskStarred(!taskStarred);
                                }}
                                onAnimationEnd={() => {
                                    setAnimate(false);
                                }}
                            >
                                {taskStarred ? "star" : "star_border"}
                            </span>
                        </div>
                        <br />
                        <label htmlFor="taskDescription">Note</label>
                        <textarea
                            name="taskDescription"
                            id="taskDescription"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            placeholder="Type here..."
                            spellCheck="false"
                        />
                    </div>
                    <div className={styles.editFooter}>
                        <ActionButton
                            className={styles.backBtn}
                            varient="secondary"
                            onClick={() => {
                                console.log("add new task");
                                changeAction("view");
                            }}
                        >
                            <span className="material-icons">
                                arrow_back_ios
                            </span>
                        </ActionButton>
                        <ActionButton
                            className={styles.addBtn}
                            varient="primary"
                            type="submit"
                        >
                            {userState === "edit" ? "Update" : "Add"}
                        </ActionButton>
                    </div>
                </form>
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
                                    selectTask(task);
                                    changeState("edit");
                                    changeAction("edit");
                                }}
                                onDelete={() => {
                                    removeTask(task.id);
                                }}
                                onDetail={() => {
                                    selectTask(task);
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
                        selectTask(newTask);
                        changeState("new");
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
                            <span className={`material-icons`}>star</span>
                        ) : (
                            ""
                        )}

                        {selectedTask?.completed ? (
                            <span className={`material-icons `}>
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
