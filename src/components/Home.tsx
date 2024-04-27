import Body from "./Body";
import Navbar from "./Navbar";
import { AppContext, AppContextInterface } from "./App";
import { useContext, useEffect } from "react";

const Home = () => {
    const { searchBar, setSearchBar, setDateRange } = useContext(AppContext) as AppContextInterface;

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