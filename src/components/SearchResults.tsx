import { useContext, useEffect } from "react";
import { AppContext, AppContextInterface } from "./App";
import Navbar from "./Navbar";
import SearchResultBody from "./SearchResultBody";

const SearchResults = () => {
    const { setSearchBar } = useContext(AppContext) as AppContextInterface;

    useEffect(() => {
        setSearchBar(true);
    },[])
    
    return (
        <div>
            <Navbar />
            <SearchResultBody />
        </div>
    )
}

export default SearchResults;