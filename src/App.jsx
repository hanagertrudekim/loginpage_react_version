import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Complete from "./Complete";
import "./style.css";

function App() {
  return (
    <Routes>
      <Route path="/complete" element={<Complete />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
