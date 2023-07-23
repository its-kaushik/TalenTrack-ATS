import { useEffect, useState } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const LoggedLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
};

const Layout = () => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLogged ? <LoggedLayout /> : <Layout />,
      children: [
        {
          path: "/",
          element: isLogged ? <Home /> : <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);

  useEffect(() => {
    setIsLogged(localStorage.getItem("accessToken"));
  }, [isLogged]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <RouterProvider router={router}></RouterProvider>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
