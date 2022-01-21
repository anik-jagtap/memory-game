import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import ApplicationLayout from "../layouts/appLayout";
import HomePage from "../screens/home";
import PlaygroundPage from "../screens/playground";
const AppRoutes = () => (
    <Router>
        <ApplicationLayout>
        <Routes>
            <Route exact path="/*" component={<App />} />
            <Route exact path="/" element={<HomePage/>} />
            <Route exact path="/playground/:id" element={<PlaygroundPage/>} />
        </Routes>
        </ApplicationLayout>
    </Router>
)
export default AppRoutes;