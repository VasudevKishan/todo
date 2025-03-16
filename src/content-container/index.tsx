import React from "react";
import styles from "./styles.module.css";
import SideBar from "../sidebar";
import TodoContainer from "../todo-contiainer";

const ContentContainer: React.FC = () => {
    return (
        <div className={styles.container}>
            <SideBar />
            <TodoContainer />
        </div>
    );
};

export default ContentContainer;
