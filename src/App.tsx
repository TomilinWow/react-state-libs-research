import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReduxTodoApp from "./components/ReduxTodoApp/ReduxTodoApp";
import ReduxPixelApp from "./components/ReduxPixelApp/ReduxPixelApp";
import MobxTodoApp from "./components/MobxTodoApp/MobxTodoApp";
import MobxPixelApp from "./components/MobxPixelApp/MobxPixelApp";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/reduxtodo" element={<ReduxTodoApp />} />
          <Route path="/reduxpixel" element={<ReduxPixelApp />} />
          <Route path="/mobxtodo" element={<MobxTodoApp />} />
          <Route path="/mobxpixel" element={<MobxPixelApp />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;