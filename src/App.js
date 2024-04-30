import logo from './logo.svg';
import './App.css';
import Registration from './pages/Registration';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './protected routes/ProtectedRoute';
import Main from './pages/Main';
import { useState } from 'react';

function App() {

  const [signin,setSignin] = useState(false)

  return (
    <div className="App">
      <Routes>
        <Route path='/app' element={<ProtectedRoute signin={signin} Main={Main} />} />
        <Route path='/' element={<Registration setSignin={setSignin}/>} />
      </Routes>
    </div>
  );
}

export default App;
