// import './App.css'
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebase";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUP from "./pages/SignUp";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/seller/Dashboard";

// const auth = getAuth(app)

// const signUpUser = () => {
//   createUserWithEmailAndPassword(auth,"rishavsd2000"
// }

// const db = getDatabase(app);

// const putData = () => {
//   set(ref(db, "users"), {
//     id: 1,
//     name: "Rishav",
//     email: "rishavsd2000@gmail.com",
//     age: 23,
//   });
// };

function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUP />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
