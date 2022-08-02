import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import ViewCharacter from './pages/ViewCharacter';
import BuildCharacter from './pages/BuildCharacter';
import Battle from './pages/Battle';
import NavBar from './components/NavBar';
import {getChars} from './api/GetChars'
import { getMoves } from './api/GetMoves';
import LoginPage from './pages/LoginPage';
import { createTheme,ThemeProvider } from '@mui/material';


export const themeOptions = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#92103e',
    },
  },
  spacing: 8,
  direction: 'rtl',
  shape: {
    borderRadius: 4,
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#689f38',
        color: '#fff',
      },
    },
  },
  props: {
    MuiAppBar: {
      color: 'inherit',
    },
  },
});

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
      <NavBar user={user}/>
        <Routes>
          <Route path="/" element={<LoginPage user={user} setUser={setUser}/>} />
          <Route path="/character/view" element={user && <ViewCharacter getSetCharandMoveData = {getSetCharandMoveData} moves={moveData} charData={charData}/>} />
          <Route path="/character/build" element={user && moveData!=null && <BuildCharacter getSetCharandMoveData = {getSetCharandMoveData} moves={moveData}/>} />
          <Route path="/character/battle" element={user && moveData!=null && <Battle moves={moveData} charData={charData}/>} />
        </Routes>
      </Router>
    </ThemeProvider>
    </div>

  )
}

export default App
