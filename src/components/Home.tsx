import Body from "./Body";
import Navbar from "./Navbar";
import { AppContext, AppContextInterface } from "./App";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { user, setSearchBar, setDateRange } = useContext(AppContext) as AppContextInterface;

    const navigate = useNavigate();

    useEffect(() => {
        // if(!user?.isLoggedIn) {
        //     navigate('/customer/login');
        // }

        setSearchBar(true);
        setDateRange([]);
    },[])

    return (
        <div>
            <Navbar enteredDates={null} enteredQuery={null} />
            <Body />
        </div>
    )
}

export default Home;