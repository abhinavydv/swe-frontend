import {  TextField } from '@mui/material';
import '../styles/Login-Register.css'
import { Link } from 'react-router-dom';

const LoginPartner= () => {
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
                    Partner Login
                </div>
                <form className="login-form">

                    <div className='input-group'>

                        <TextField label='Username/Email ID' fullWidth />
                    </div>

                    <div className='input-group'>
                        <TextField type='password' label='Password' fullWidth />
                    </div>

                    <button type="submit" className="login-btn">Login</button>
                </form>


                    <Link to={'/customer/login'}><div className='login-switch'>Are you a customer?</div></Link>

            </div>


        </div>
      );
}

export default LoginPartner;