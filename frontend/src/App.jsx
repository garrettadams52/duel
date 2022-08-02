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
import SignInSide from './pages/SignInPage'
import SignUp from './pages/AccountCreation'
import ResponsiveAppBar from './components/NavBar';
import Account from './pages/Account';

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
    shape: {
      borderRadius: 4,
    },
    direction: 'ltr',
    overrides: {
      MuiButton: {
        root: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
        },
      },
    },
    props: {
      MuiList: {
        dense: true,
      },
      MuiMenuItem: {
        dense: true,
      },
      MuiTable: {
        size: 'small',
      },
      MuiButton: {
        size: 'small',
      },
      MuiButtonGroup: {
        size: 'small',
      },
      MuiCheckbox: {
        size: 'small',
      },
      MuiFab: {
        size: 'small',
      },
      MuiFormControl: {
        margin: 'dense',
        size: 'small',
      },
      MuiFormHelperText: {
        margin: 'dense',
      },
      MuiIconButton: {
        size: 'small',
      },
      MuiInputBase: {
        margin: 'dense',
      },
      MuiInputLabel: {
        margin: 'dense',
      },
      MuiRadio: {
        size: 'small',
      },
      MuiSwitch: {
        size: 'small',
      },
      MuiTextField: {
        margin: 'dense',
        size: 'small',
      },
      MuiTooltip: {
        arrow: true,
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
      <ResponsiveAppBar user={user}/>
        <Routes>
          <Route path="/" element={<SignInSide user={user} setUser={setUser}/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/account" element={<Account/>} />
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
