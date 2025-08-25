import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <Routes>
        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Default Redirect to Signup */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </Router>
  );
}

export default App;