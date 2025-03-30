import React from "react";
import styles from "./styles.module.css";
import {ActionButton} from "../components/ActionButton/ActionButton";

const TodoContainer: React.FC = () => {
    return (
        <main className={styles.container}>
            <ActionButton
                varient="primary"
                onClick={() => console.log("Clicked on primary btn")}
            >
                Primary Btn
            </ActionButton>
            <br />
            <ActionButton
                varient="secondary"
                onClick={() => console.log("Clicked on Secondary btn")}
            >
                <span className="material-icons">arrow_back_ios</span>
            </ActionButton>
        </main>
    );
};

export default TodoContainer;
