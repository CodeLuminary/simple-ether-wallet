import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './css/views/login';

function App() {
  return (   
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login defaultMode={true} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
