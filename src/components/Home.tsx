import Body from "./Body";
import Navbar from "./Navbar";
import { AppContext, AppContextInterface } from "./App";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { setSearchBar, setDateRange, mounted, user } = useContext(AppContext) as AppContextInterface;

    const navigate = useNavigate();

    if (mounted && user?.isLoggedIn && user.role === 'partner') {
        navigate('/partner');
    }

    useEffect(() => {
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