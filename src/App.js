import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Generate from "./components/Generate";
import Botsearch from "./components/Botsearch";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Botsearch />} />
        <Route path="/generate" element={<Generate />} />
      </Routes>
    </Router>
  );
};

export default App;
