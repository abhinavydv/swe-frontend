import { TextField } from '@mui/material';
import '../styles/Login-Register.css'
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiTelInput } from 'mui-tel-input'

import { Link } from 'react-router-dom';



const RegisterCustomer = () => {
    return (
        <div className='register-container' >
            <div className='register-title'>
                <div className='register-to'>
                    Welcome to 
                </div>
                <div className='brand'>
                    WANDERLUST.COM
                </div>
            </div>
            <div className="register-body">
                <div className='register-name'>
                    Customer Registration
                </div>
                <form className="register-form">
                    <div className="input-group">
                        <div className='name'>

                            <TextField  label='First name' />
                        </div>
                        <div className='name'>
                           
                            <TextField label='Middle name'/>
                        </div>
                        <div className='name'>
                            <TextField label='Last name' />
                        </div>


                    </div>
                    <div className="input-group">
                        <div className='date-of-birth'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker  label='Date of Birth' /> 
                            </LocalizationProvider>
                        </div>
                        <div className='phone-number'>
                            <MuiTelInput label="Phone Number"  value='+91'  />
                        </div>
                    </div>

                    <div className='input-group'>

                        <TextField label='Email ID' fullWidth />
                    </div>

                    <div className='input-group'>
                        <TextField type='password' label='Password' fullWidth />
                    </div>
                    <div className='input-group'>
                        <TextField type='password' label=' Confirm Password' fullWidth />
                    </div>
                    <button type="submit" className="register-btn">Register</button>
                </form>


                    <Link to={'/partner/register'}><div className='register-switch'>Are you a partner?</div></Link>

            </div>


        </div>
      );
}

export default RegisterCustomer;