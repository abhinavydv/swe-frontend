import { useContext, useEffect } from "react"
import Navbar from "./Navbar"
import { AppContext, AppContextInterface } from "./App"
import HotelPageBody from "./HotelPageBody";
import { Footer } from "./Footer";

const HotelPage = () => {
    const { setSearchBar } = useContext(AppContext) as AppContextInterface;
    useEffect(() => {
        setSearchBar(false);
    },[])

    return (
        <div>
            <Navbar />
            <HotelPageBody />
            <Footer />
        </div>
    )
}

export default HotelPage;