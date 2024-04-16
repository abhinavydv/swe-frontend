import { useContext } from "react";
import { AppContext } from "./App";

function Middlesection()  {
    const { user } = useContext(AppContext);

    return (
        <div className='middleSection'>
            <div id='middleContainer'>
                <div className='company'>
                    WANDERLUST.COM
                </div>
                <div className='motto'>
                    {user?.role == "customer" ? "Where to next?" : "List your property now!"}
                </div>
            </div>
        </div>
    )
}

export default Middlesection;