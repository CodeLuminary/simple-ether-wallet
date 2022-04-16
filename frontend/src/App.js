import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/login';
import AdminRouter from "./views/userpanel/router";

function App() {
  return (   
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login defaultMode={true} />} />
          <Route path="admin" element={<AdminRouter />}/>
          <Route path="admin/*" element={<AdminRouter />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
