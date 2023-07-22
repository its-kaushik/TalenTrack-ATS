import { useState } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./Pages/Login/Login";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const HomeLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
};

const LoginLayout = () => {
  return (
    <div className="app">
      <Login />
      <Outlet />
    </div>
  );
};

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLogged ? <HomeLayout /> : <LoginLayout />,
    },
  ]);

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
