import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import View from './pages/View';
import BuildCharacter from './pages/BuildCharacter';
import Battle from './pages/Battle';
import {getChars} from './api/GetChars'
import { getMoves } from './api/GetMoves';
import {ThemeProvider } from '@mui/material';
import SignInSide from './pages/SignInPage'
import SignUp from './pages/AccountCreation'
import ResponsiveAppBar from './components/NavBar';
import Account from './pages/Account';
import { themeOptions } from './components/Theme';

//Create Cookie for session
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');
axios.defaults.headers.common['X-CSRFToken'] = csrftoken


function App() {
  const [charData, setCharData] = useState(null)
  const [moveData, setMoveData] = useState(null)
  const [user, setUser] = useState(null)

  const getSetCharandMoveData = async () => {
    const charData = await getChars();
    setCharData(charData.data)
    const moveData = await getMoves();
    setMoveData(moveData)
  }

  useEffect(() => {
    getSetCharandMoveData()
  }, [])


  return (

    <div className="App">
    <ThemeProvider theme={themeOptions}>
      <Router>
      <ResponsiveAppBar user={user}/>
        <Routes>
          <Route path="/" element={<SignInSide user={user} setUser={setUser}/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/account" element={user && <Account user={user}/>} />
          <Route path="/view" element={user && moveData && charData && <View getSetCharandMoveData = {getSetCharandMoveData} moves={moveData} charData={charData}/>} />
          <Route path="/build" element={user && moveData && <BuildCharacter getSetCharandMoveData = {getSetCharandMoveData} moves={moveData}/>} />
          <Route path="/battle" element={user && moveData && <Battle getSetCharandMoveData = {getSetCharandMoveData} moves={moveData} charData={charData}/>} />
        </Routes>
      </Router>
    </ThemeProvider>
    </div>

  )
}

export default App
