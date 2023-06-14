import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import CreateQuote from "./components/CreateQuote";
import Home from "./components/Home";
import OtherUserProfile from "./components/OtherUserProfile";
import NotFound from "./components/NotFound";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/create",
    element: <CreateQuote />,
  },
  {
    path: "/profile/:userid",
    element: <OtherUserProfile />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
