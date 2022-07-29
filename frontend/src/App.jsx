import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import ViewCharacter from './pages/CharacterView';
import BuildCharacter from './pages/CharacterBuild';
import Battle from './pages/Battle';
import NavBar from './components/NavBar';

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
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(null)

  const submitLoginForm = function(event){
    event.preventDefault()
    axios.post('/login',{email:'jeff@amazon.com', password:'dragons'}).then((response)=>{
      console.log('response from server: ', response)
      window.location.reload()
    })
  }

  const whoAmI = async () => {
    const response = await axios.get('/whoami')
    const user = response.data && response.data[0] && response.data[0].fields
    setUser(user)
  }

  const logOut = function(event){
    event.preventDefault()
    axios.post('/logout').then((response)=>{
      console.log('response from server: ', response)
      whoAmI()
    })
  }

  const submitSignupForm = function(event){
    event.preventDefault()
    axios.post('/signup',{email:'jeff@amazon.com', password:'dragons'}).then((response)=>{
      console.log('response from server: ', response)
    })

  }

  useEffect(()=>{
    whoAmI()
  }, [])


  return (
    <div className="App">
      <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={
          <div>
            
            <h1>Dueling Site Login</h1>
            {user && <p>Welcome, {user.email}</p>}
            <button onClick={submitSignupForm}>Sign Up</button>
            <button onClick={submitLoginForm}>Log In</button>
            <button onClick={logOut}>Log Out</button>
          </div>}/>

          
          
      <Route path="/character/view" element={<ViewCharacter />} />
      <Route path="/character/build" element={<BuildCharacter />} />
      <Route path="/character/battle" element={<Battle />} />
          
      </Routes>
      
      
      </Router>

    </div>
  )
}

export default App
