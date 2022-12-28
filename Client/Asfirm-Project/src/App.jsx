// react imports

import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authStatus } from './features/user/authenticatedSlice';
import { getUserData, subscribed } from './features/user/authenticatedSlice';

// component imports
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import CreatePost from './components/CreatePost';
import UploatProjectPic from './components/UploatProjectPic';
import ProprietorDashboard from './components/ProprietorDashboard';
import UserProfile from './components/UserProfile';
import EditUserInfo from './components/EditUserInfo';

// style import
import './App.css';
import Services from './components/Services';
import About from './components/About';

import Contact from './components/Contact';
import Projects from './components/Projects';
import HelpPage from './components/HelpPage';
import { useState } from 'react';
import { useEffect } from 'react';
import EditProject from './components/EditProject';
import PricingPage from './components/PricintPage';
import ProjectView from './components/ProjectView';
import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    resize: {
      fontSize: '15px',
    },
  },
});

function App() {
  const navigate = useNavigate();
  const auth = useSelector((state) => {
    state.authCheck.active;
  });
  const [user, setUser] = useState(null);
  const [sub, setSub] = useState('');
  const [userActive, setUserActive] = useState(false);
  const dispatch = useDispatch();

  const nav = <NavBar active={userActive} />;

  // const userInfo = useSelector((state) => {});
  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem('info')).accessToken; // getting the token from storage
    const id = JSON.parse(localStorage.getItem('info')).id; // getting id from storage
    const API = `${import.meta.env.VITE_LINK_URL}/${id}/signedIn`; // route for login check
    const response = axios
      .get(API, {
        headers: {
          'auth-token': `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log('cheAuth fro app body ', res.data, { auth: true });
        setUserActive(true);
        setUser(res.data);
        dispatch(authStatus(true));
        // navigating to the home page
        dispatch(getUserData(res.data));
        dispatch(subscribed(res.data.sub));
        setSub(res.data.sub);
        // console.log('got here', req.data.sub, 'for sub');
        return res.data;
      })
      .catch((e) => {
        // console.log('from app body', e.message, { auth: false });
        // navigate('/login');
        setUserActive(false);
      });
    // return response.data;
  }, []);

  return (
    <div className="App ">
      {/* {userActive ? nav : ''} */}
      {console.log('is auth or not in body ')}

      <Routes>
        <Route path="/" element={<Home auth={userActive} />} />
        <Route path="/services" element={<Services auth={userActive} />} />
        <Route path="/contact" element={<Contact auth={userActive} />} />
        <Route path="/about" element={<About auth={userActive} />} />
        <Route path="/help" element={<HelpPage auth={userActive} />} />
        <Route
          path="/pricing"
          element={<PricingPage auth={userActive} sub={sub} />}
        />
        <Route path="/login" element={<Login auth={userActive} />} />
        <Route path="/register" element={<Register auth={userActive} />} />
        <Route
          path="/projects"
          element={<Projects auth={userActive} sub={sub} />}
        />
        <Route path="/project" element={<ProjectView />} sub={sub} />
        <Route
          path="/user/profile"
          element={<UserProfile auth={userActive} sub={sub} />}
        />
        <Route
          path="/user/createPost"
          element={<CreatePost auth={userActive} sub={sub} />}
        />
        <Route
          path="/user/uploads"
          element={<UploatProjectPic auth={userActive} sub={sub} />}
        />
        <Route
          path="/user/dashboard"
          element={<ProprietorDashboard auth={userActive} sub={sub} />}
        />
        <Route
          path="/user/editInfo"
          element={<EditUserInfo auth={userActive} />}
        />
        <Route
          path="/editProject"
          element={<EditProject auth={userActive} sub={sub} />}
        />
        <Route
          path="/projectView"
          element={<ProjectView auth={userActive} sub={sub} />}
        />
      </Routes>
    </div>
  );
}

export default App;
