import {  Button, TextField } from '@mui/material';
import '../styles/Login-Register.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login= ({role}: any) => {
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    const [loginStatus, setLoginStatus] = useState('');
    const [_, setButtonStatus] = useState('');

    const navigate = useNavigate();

    const [username, setUsername] = useState('');

    const onLogin = async (e: any) => {

        e.preventDefault();
        setLoginStatus('');

        setUsernameError(false);
        setPasswordError(false);

        if (username === '')
            setUsernameError(true);

        if (password === '')
            setPasswordError(true);


        if (username !== '' && password !== '') {


            await axios.post('https://backend.iith-ac.in/login', {
            role: role,
            username: username,
            password: password,
            }, { withCredentials: true })
            .then((response) => {

                console.log(response);

                console.log(response.data.message);

                var result = JSON.stringify(response.data);

                var json = JSON.parse(result);

                console.log(json.message);

                //setLoginStatus(json.data[0]);

                if (json.message == 'Login Successful') {

                

                // setIsAuth(true);
                // setSignedDetails(null);
                // setJustSignedUp(false);
                // setLoginStatus(json.message);
                    setButtonStatus("Login");
                    navigate('/');

                }
                else if (json.message == 'Incorrect Password') {

                    setLoginStatus(json.message);
                    setPasswordError(true);
                    setButtonStatus("Try Again");
                }
                else {
                    setLoginStatus(json.message);
                    setUsernameError(true);
                    setButtonStatus("Try Again");
                    navigate('/login');

                }
            });
        }
    }
    

    return (
        <div className='login-container' >
            <div className='login-title'>
                <div className='login-to'>
                    Login to
                </div>
                <div className='brand'>
                    WANDERLUST.COM
                </div>
            </div>
            <div className="login-body">
                <div className='login-name'>
                    {role == "partner" && "Partner Login" || "Customer Login"}
                </div>
                <form className="login-form">

                    <div className='input-group'>

                        <TextField 
                            label='Username/Email ID' 
                            fullWidth 
                            onChange={(e) => {setUsername(e.target.value)}}
                            error={usernameError}
                            helperText={usernameError ? loginStatus : ""}
                            />
                    </div>

                    <div className='input-group'>
                        <TextField 
                            type='password' 
                            label='Password' 
                            fullWidth 
                            onChange={(e) => {setPassword(e.target.value)}}
                            error={passwordError}
                            helperText={passwordError ? loginStatus : ''}
                            />
                    </div>

                    <Button type="submit" className="login-btn" onClick={onLogin}>Login</Button>
                </form>


                    <Link to={'/customer-login'}><div className='login-switch'>Are you a {role == "partner"? "customer": "partner"}?</div></Link>

            </div>


        </div>
      );
}

export default Login;