import { Link } from "react-router-dom";
import "./NavBar.css";
function NavBar(){
    return <div className="navbar">
     <Link to="/character/view">View Page</Link>
     <Link to="/character/build">Build Page</Link>
     <Link to="/character/battle">Battle Page</Link>
    </div>
}

export default NavBar