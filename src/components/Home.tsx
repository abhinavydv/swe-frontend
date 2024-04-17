import Body from "./Body";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import { AppContext, AppContextInterface } from "./App";
import { useContext, useEffect } from "react";

const Home = () => {
    const { setSearchBar } = useContext(AppContext) as AppContextInterface;

    useEffect(() => {
        setSearchBar(true);
    },[])

    if (window){
        console.log(window.location)
    }

    return (
        <div>
            <Navbar />
            <Body />
            <Footer />
        </div>
    )
}

export default Home;