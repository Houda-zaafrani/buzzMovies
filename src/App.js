import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Regiter from "./pages/Regiter";
import Navbarr from "./component/tasks/navbar/Navbarr";
import { useState } from "react";
import Profile from "./pages/Profile";
import Footerf from "./component/tasks/footer/Footerf";

function App() {
  // const [isAuth]
  const [isTogled, setIsTogled] = useState(false);

  const toggleButton = () => {
    setIsTogled(!isTogled);
  };
  return (
    <div className={`App ${isTogled ? "dark-app" : ""}`}>
      <header className="App-header">
        <Navbarr isTogled={isTogled} toggleButton={toggleButton} />

        <Routes>
          <Route
            path="/"
            element={
              <Profile isTogled={isTogled} toggleButton={toggleButton} />
            }
          />

          <Route
            path="/login"
            element={<Login isTogled={isTogled} toggleButton={toggleButton} />}
          />

          <Route
            path="/register"
            element={
              <Regiter isTogled={isTogled} toggleButton={toggleButton} />
            }
          />
          <Route
            path="/home"
            element={<Home isTogled={isTogled} toggleButton={toggleButton} />}
          />
        </Routes>
        
        <Footerf isTogled={isTogled} toggleButton={toggleButton}/>
      </header>
    </div>
  );
}

export default App;
