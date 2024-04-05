import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createContext, useState, useEffect } from "react"

import Home from './pages/Home'
import Navbar from './components/Navbar'

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }

  useEffect(() => {
    document.body.style.backgroundColor = theme === "light" ? "#fafafa" : "#9d95cf";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div className="App" id={theme}>
      <BrowserRouter>
      <Navbar toggleTheme={toggleTheme} theme={theme}/>
        <div className="pages">
          <Routes>
          <Route
            path="/"
            element={<Home/>}
          />
          </Routes>
        </div>
      </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
