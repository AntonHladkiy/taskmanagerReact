import React, { useState } from 'react';
import {Link} from "react-router-dom";
const SignUp = props => {
    const [user, setUser] = useState(props.initialUser);

    const handleInputChange = event => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    };

    return (
        <form autocomplete="off">
            <label className= "form-check-label">Email</label>
            <input className= "form-control w-25" type="text" name="email" value={user.email} onChange={handleInputChange} ></input>
            <label className= "form-check-label">Password</label>
            <input className= "form-control w-25" type="text" name="password" value={user.password} onChange={handleInputChange} ></input>
            <Link to ="/login"> <button className="btn btn-warning mt-2 mr-2" onClick={()=> {
                if (!user.email|| !user.password) return;
                props.signUp(user)
            }}>Sign Up</button></Link>
            <Link to ="/"><button className={"btn btn-danger mt-2"}>Cancel</button></Link>
        </form>
    )
}
export default SignUp;