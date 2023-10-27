import React, { useState } from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('http://bff:3002/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(res => res.json())
}

const Login = ({ setToken }) => {
    const [employee_id, setEmployeeID] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            employee_id,
            password
        });
        console.log(employee_id)
        setToken(token);
        console.log(token.token)
    }

    return [
        <div className="login-box">
            <h2> Login</h2>
            <form onSubmit={handleSubmit}>
            <div class="user-box">
           <input type="text" name="" required="" onChange={e => setEmployeeID(e.target.value)}></input>
         <label>EmployeeID</label>
        </div> 
        <div class="user-box">
       <input type="password" name="" required="" onChange={e => setPassword(e.target.value)}></input>
        <label>Password</label>
       </div>
 
                <div>
                    <button type="submit">Submit </button>
                </div>
            </form>
        </div>


];
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;
