import { useEffect } from 'react';
import './App.css';
import TextEditor from './pages/TextEditor';
// import {io} from "socket.io-client"
import { BrowserRouter as Router,Routes,Route} from "react-router-dom"
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import { useDispatch } from 'react-redux';
import { loadUser} from './store/slices/userSlice';
import LandingPage from './pages/LandingPage';
import About from './pages/about';
import SignIn from './pages/SignIn';
import WrongRoute from './pages/WrongRoute';
import Protected from './components/protected';


function App() {



const dispatch = useDispatch();
useEffect(() => {
dispatch(loadUser())
}, [dispatch]);

// useEffect(()=>{
// const socket=io("http://localhost:3001")

// return ()=>{
//   socket.disconnect()
// }
// },[])

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Protected Component={HomePage} />} />
          <Route path="/:fileId" element={<Protected Component={TextEditor} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<WrongRoute />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
