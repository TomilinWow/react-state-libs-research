import MobxPixelApp from "../pages/MobxPixelApp";
import MobxTodoApp from "../pages/MobxTodoApp";
import ReduxPixelApp from "../pages/ReduxPixelApp";
import ReduxTodoApp from "../pages/ReduxTodoApp/ReduxTodoApp";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContextTodoApp from "../pages/ContextTodoApp/ContextTodoApp";

const AppRouters: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/contexttodo" element={<ContextTodoApp />} />
                <Route path="/reduxtodo" element={<ReduxTodoApp />} />
                <Route path="/reduxpixel" element={<ReduxPixelApp />} />
                <Route path="/mobxtodo" element={<MobxTodoApp />} />
                <Route path="/mobxpixel" element={<MobxPixelApp />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouters;