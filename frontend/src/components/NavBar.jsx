import { Link } from "react-router-dom";
import "./NavBar.css";
function NavBar({user}){
    return <div className="navbar">
        <Link to='/'>Login/Logout</Link>
        {user && <h4>{user.email}</h4>}
        <Link to="/character/view">View Page</Link>
        <Link to="/character/build">Build Page</Link>
        <Link to="/character/battle">Battle Page</Link>
    </div>
}

export default NavBar