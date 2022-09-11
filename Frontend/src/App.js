import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Documents from './components/Documents/Documents';


function App() {
  return (
    <>
    <Header/>
    <Routes>
        <Route default path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/managedocs' element={<Documents/>}/>
    </Routes>
    </>
  );
}

export default App;
