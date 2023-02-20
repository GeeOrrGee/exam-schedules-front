import React from 'react';
import './App.css';
import Search from "./components/Search";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./components/header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Contact from "./components/Contact";

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
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Search />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </BrowserRouter>

            </ThemeProvider>
        </div>
    );
}

export default App;
