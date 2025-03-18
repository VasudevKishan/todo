import "./App.css";
import Header from "./header";
import ContentContainer from "./content-container";
import {ThemeProvider} from "./context/ThemeContext";

function App() {
    return (
        <ThemeProvider>
            <>
                <Header />
                <ContentContainer />
            </>
        </ThemeProvider>
    );
}

export default App;
