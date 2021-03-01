import React, { useState } from 'react';
import {Link} from "react-router-dom";
const SignUp = props => {
    const [user, setUser] = useState(props.initialUser);

    const handleInputChange = event => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    };

    return (
        <form className={"form-check"} autoComplete="off">
            <label className= "form-check-label">Email</label>
            <input className= "form-control w-50" type="text" name="email" value={user.email} onChange={handleInputChange} ></input>
            <label className= "form-check-label">First Name</label>
            <input className= "form-control w-50" type="text" name="firstName" value={user.firstName} onChange={handleInputChange} ></input>
            <label className= "form-check-label">Last Name</label>
            <input className= "form-control w-50" type="text" name="lastName" value={user.lastName} onChange={handleInputChange} ></input>
            <label className= "form-check-label">Password</label>
            <input className= "form-control w-50" name="password" type="password" value={user.password} onChange={handleInputChange} ></input>
            <label className= "form-check-label">Password</label>
            <input className= "form-control w-50" type="password" name="passwordConfirmation" value={user.passwordConfirmation} onChange={handleInputChange} ></input>
            <Link to ="/login"> <button className="btn btn-success mt-2 mr-2 w-25" onClick={()=> {
                if (!user.email|| !user.password|| !user.passwordConfirmation|| !user.lastName|| !user.firstName|| (user.passwordConfirmation!==user.password)) {
                    alert("Wrong form format try again")
                    return
                };
                props.signUp(user)
            }}>Sign Up</button></Link>
            <Link to ="/"><button  className={"btn btn-danger mt-2 ml-auto w-25"}>Cancel</button></Link>
        </form>
    )
}
export default SignUp;