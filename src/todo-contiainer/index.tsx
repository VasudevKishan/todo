import React from "react";
import styles from "./styles.module.css";
import {ActionButton} from "../components/ActionButton/ActionButton";

const TodoContainer: React.FC = () => {
    return (
        <main className={styles.container}>
            <div className={`${styles.slide} ${styles["add-task"]}`}>
                Add Task
                <ActionButton
                    className={styles.backBtn}
                    varient="secondary"
                    onClick={() => console.log("Clicked on Secondary btn")}
                >
                    <span className="material-icons">arrow_back_ios</span>
                </ActionButton>
                <ActionButton
                    varient="primary"
                    onClick={() => console.log("Clicked on primary btn")}
                    className={styles.addBtn}
                >
                    Add
                </ActionButton>
            </div>

            <div className={`${styles.slide} ${styles["view-task"]}`}>
                View Tasks
                <ActionButton
                    varient="primary"
                    onClick={() => console.log("Clicked on primary btn")}
                    className={styles.addBtn}
                >
                    Add Task
                </ActionButton>
            </div>

            <div className={`${styles.slide} ${styles["task-detail"]}`}>
                Task Detail
                <ActionButton
                    className={styles.backBtn}
                    varient="secondary"
                    onClick={() => console.log("Clicked on Secondary btn")}
                >
                    <span className="material-icons">arrow_back_ios</span>
                </ActionButton>
            </div>
        </main>
    );
};

export default TodoContainer;
