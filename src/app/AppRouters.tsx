import MobxPixelApp from "../pages/MobxPixelApp";
import MobxTodoApp from "../pages/MobxTodoApp";
import ReduxTodoApp from "../pages/ReduxTodoApp/ReduxTodoApp";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContextTodoApp from "../pages/ContextTodoApp/ContextTodoApp";
import ContextPixelApp from "../pages/ContextPixelApp/ContextPixelApp";
import ReduxPixelApp from "../pages/ReduxPixelApp/ReduxPixelApp";

const AppRouters: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/contexttodo" element={<ContextTodoApp />} />
                <Route path="/contextpixel" element={<ContextPixelApp />} />
                <Route path="/reduxtodo" element={<ReduxTodoApp />} />
                <Route path="/reduxpixel" element={<ReduxPixelApp />} />
                <Route path="/mobxtodo" element={<MobxTodoApp />} />
                <Route path="/mobxpixel" element={<MobxPixelApp />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouters;