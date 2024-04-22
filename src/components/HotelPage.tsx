import { useContext, useEffect } from "react"
import Navbar from "./Navbar"
import { AppContext, AppContextInterface } from "./App"
import HotelPageBody from "./HotelPageBody";


const HotelPage = () => {
    const { setSearchBar } = useContext(AppContext) as AppContextInterface;
    useEffect(() => {
        setSearchBar(false);
    },[])

    return (
        <div>
            <Navbar enteredDates={null} enteredQuery={null}/>
            <HotelPageBody />
        </div>
    )
}

export default HotelPage;