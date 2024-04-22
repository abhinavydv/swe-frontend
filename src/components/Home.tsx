import Body from "./Body";
import Navbar from "./Navbar";
import { AppContext, AppContextInterface } from "./App";
import { useContext, useEffect } from "react";

const Home = () => {
    const { setSearchBar, setDateRange } = useContext(AppContext) as AppContextInterface;

    useEffect(() => {
        setSearchBar(true);
        setDateRange([]);
    },[])

    if (window){
        console.log(window.location)
    }

    return (
        <div>
            <Navbar enteredDates={null} enteredQuery={null} />
            <Body />
        </div>
    )
}

export default Home;