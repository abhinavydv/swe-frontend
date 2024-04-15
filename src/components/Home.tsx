import Body from "./Body";
import Navbar from "./Navbar";
import { AppContext, AppContextInterface } from "./App";
import { useContext, useEffect } from "react";

const Home = () => {
    const { setSearchBar } = useContext(AppContext) as AppContextInterface;

    useEffect(() => {
        setSearchBar(true);
    },[])

    return (
        <div>
            <Navbar />
            <Body />
        </div>
    )
}

export default Home;