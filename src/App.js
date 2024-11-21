import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"; 
import { ToastContainer } from "react-toastify";
import UserDashboard from "./pages/user-routes/UserDashboard";
import PrivateRoute from "./components/PrivateRoute";
import ProfileInfo from "./pages/user-routes/ProfileInfo";

function App() {
  return (
      <BrowserRouter>
          <ToastContainer />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/user" element={<PrivateRoute />}>
                  <Route path="dashboard" element={<UserDashboard />} />
                  <Route path="profile-info" element={<ProfileInfo />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
