import React from 'react';
import './App.css';
import Search from "./components/Search";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./components/header";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#facd29"
        },
        secondary: {
            main: "#37b24c"
        },
        info: {
            main: "#c3273d"
        }
    },
});

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <Header/>
                <Search/>
            </ThemeProvider>
        </div>
    );
}

export default App;
