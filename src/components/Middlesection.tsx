import { useContext } from "react";
import { AppContext } from "./App";
import { Link } from "react-router-dom";


function Middlesection()  {
    const { user } = useContext(AppContext);

    return (
        <div className='middleSection'>
            <div id='middleContainer'>
                <div className='company'>
                    <Link to='/' style={{
                        color: 'white',
                        textDecoration: 'none',
                    }} >WANDERLUST.COM</Link>
                </div>
                <div className='motto'>
                    {user?.role == "customer" ? "Where to next?" : "List your property now!"}
                </div>
            </div>
        </div>
    )
}

export default Middlesection;