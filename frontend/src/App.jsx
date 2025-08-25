import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserProfileSetup from "./pages/UserProfileSetup";
import UserProfile from "./pages/UserProfile";  // Import UserProfile component

function App() {
  return (
    <Router>
      <Routes>
        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* User Profile Setup */}
        <Route path="/profile-setup" element={<UserProfileSetup />} />

        {/* User Profile Page */}
        <Route path="/profile" element={<UserProfile />} />

        {/* Default Redirect to Signup */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </Router>
  );
}

export default App;