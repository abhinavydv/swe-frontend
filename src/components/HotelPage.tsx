import { useContext, useEffect } from "react"
import Navbar from "./Navbar"
import { AppContext, AppContextInterface } from "./App"

const HotelPage = () => {
    const { setSearchBar } = useContext(AppContext) as AppContextInterface;
    useEffect(() => {
        setSearchBar(false);
    },[])

    return (
        <div>
            <Navbar />
        </div>
    )
}

export default HotelPage;