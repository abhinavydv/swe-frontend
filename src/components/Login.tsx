import '../styles/Login.css'

const Login= () => {
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
                <form className="login-form">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
            <div className='login-footer'>
                    Are you a Partner ? 
            </div>
        </div>
      );
}

export default Login;