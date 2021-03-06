import React, { useState } from 'react';
import {Link, Redirect} from "react-router-dom";
const Login = props => {
    const [user, setUser] = useState(props.initialUser);

    const handleInputChange = event => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    };
    if(props.loggedIn===true){
        return <Redirect to="/"></Redirect>
    }
    return (
        <form className={"form-check"} autoComplete="off">
            <label className= "form-check-label">Email</label>
            <input className= "form-control w-50" type="text" name="email" value={user.email} onChange={handleInputChange} ></input>
            <label className= "form-check-label">Password</label>
            <input className= "form-control w-50" type="text" name="password" type="password"  value={user.password} onChange={handleInputChange} ></input>
            <Link to ="/"> <button className="btn btn-success mt-2 mr-2 w-25" onClick={()=> {
                if (!user.email|| !user.password) return;
                props.logIn(user)
            }}>Log In</button></Link>
            <Link to ="/"><button  className={"btn btn-danger mt-2 w-25"}>Cancel</button></Link>
        </form>
    )
}
export default Login;