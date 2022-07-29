

function LoginPage(){

    return(
        <div>
            <h1>Dueling Site Login</h1>
            {user && <p>Welcome, {user.email}</p>}
            <button onClick={submitSignupForm}>Sign Up</button>
            <button onClick={submitLoginForm}>Log In</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}

export default LoginPage