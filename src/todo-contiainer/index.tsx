import React from "react";
import styles from "./styles.module.css";
import {ActionButton} from "../components/ActionButton/ActionButton";

import {useCurrentAction} from "../hooks/useCurrentAction";

const TodoContainer: React.FC = () => {
    const {changeAction} = useCurrentAction();

    return (
        <main className={styles.container}>
            <div className={`slide ${styles.slide} ${styles["add-task"]}`}>
                Add Task
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

            <div className={` slide ${styles.slide} ${styles["view-task"]}`}>
                View Tasks
                <ActionButton
                    varient="primary"
                    onClick={() => changeAction("edit")}
                    className={styles.addBtn}
                >
                    Add Task
                </ActionButton>
            </div>

            <div className={`slide ${styles.slide} ${styles["task-detail"]}`}>
                Task Detail
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
};

export default TodoContainer;
