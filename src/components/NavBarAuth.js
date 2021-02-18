import React from "react";
import {Link} from "react-router-dom";
const NavBarAuth = props => {
    return (
    <div>
        <Link to ="/signup"><button  className={"btn btn-info mt-2"}>Sign Up</button></Link>
        {(!props.loggedIn)&&<Link to ="/login"> <button  className="btn btn-info mt-2 ">Log In</button></Link>}
        {props.loggedIn&&<Link to ="/"> <button onClick={props.logOut} className="btn btn-danger mt-2 ">Log Out</button></Link>}
    </div>
    )
}
export default NavBarAuth;