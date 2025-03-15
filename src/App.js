import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { useEffect } from 'react';
import users from './users.json';

function App() {
  useEffect(() => {
    // Initialize users in localStorage if not present
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 