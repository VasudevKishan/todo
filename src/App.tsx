import "./App.css";
import Header from "./header";
import ContentContainer from "./content-container";
import {ThemeProvider} from "./context/ThemeContext";
import {TaskProvider} from "./context/TaskContext";

function App() {
    return (
        <TaskProvider>
            <ThemeProvider>
                <>
                    <Header />
                    <ContentContainer />
                </>
            </ThemeProvider>
        </TaskProvider>
    );
}

export default App;
