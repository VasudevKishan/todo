import {useState} from "react";
import "./App.css";
import Content from "./Components/Content/Content";
import Header from "./Components/Header/Header";
import SideBar from "./Components/SideBar/SideBar";

function App() {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <main>
            <Header onToggleSidebar={toggleSidebar} />
            <SideBar className={isSidebarVisible ? "visible" : ""} />
            <Content />
        </main>
    );
}

export default App;
