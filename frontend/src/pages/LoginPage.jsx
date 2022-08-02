import { useEffect, useState } from 'react'
import axios from 'axios'

function LoginPage({user,setUser}){
    
    const submitLoginForm = function(event){
      event.preventDefault()
      let email = document.getElementById("username").value
      let password = document.getElementById("password").value
      axios.post('/login',{email: email, password:password}).then((response)=>{
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
      let email = document.getElementById("username").value
      let password = document.getElementById("password").value
      axios.post('/signup',{email:email, password: password}).then((response)=>{
        console.log('response from server: ', response)
      })
  
    }
  
    useEffect(()=>{
      whoAmI()
    }, [])
  
  

    return(
        <div>
            <h1>Dueling Site Login</h1>
            {user && <p>Welcome, {user.email}</p>}
            <div><input id ="username" placeholder='User Name'></input></div>
            <div><input id = "password" placeholder='Password'></input></div>
            <button onClick={submitSignupForm}>Sign Up</button>
            <button onClick={submitLoginForm}>Log In</button>
            <button onClick={logOut}>Log Out</button>
           
        </div>
    )
}

export default LoginPage