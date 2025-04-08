import React from "react";
import styles from "./styles.module.css";
import SideBar from "../sidebar";
import TodoContainer from "../todo-contiainer";
import {UserActionProvider} from "../context/UserActionContext";

const ContentContainer: React.FC = () => {
    return (
        <div className={styles.container}>
            <SideBar />
            <UserActionProvider>
                <TodoContainer />
            </UserActionProvider>
        </div>
    );
};

export default ContentContainer;
