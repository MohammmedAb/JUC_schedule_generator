
import {Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Tables from './pages/Tables';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Schedules/:courses/:type" element={<Tables />} />
      </Routes>
    </div>
  );
}

export default App;
