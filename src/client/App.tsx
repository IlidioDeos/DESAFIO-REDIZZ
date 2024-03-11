import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

interface AppProps {}

const App = (props: AppProps) => {
    return (
        <BrowserRouter>
            <h1>Hello</h1>
        </BrowserRouter>
    );
}


export default App;