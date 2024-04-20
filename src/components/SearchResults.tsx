import { useContext, useEffect, useState } from "react";
import { AppContext, AppContextInterface } from "./App";
import Navbar from "./Navbar";
import SearchResultBody from "./SearchResultBody";
import axios from "axios";

const SearchResults = () => {
    const { setSearchBar } = useContext(AppContext) as AppContextInterface;
    const [queryResults, setQueryResults] = useState();
    const [enteredQuery, setQuery] = useState<string>('');
    const [enteredDates, setDates] = useState<string>('');

    useEffect(() => {
        setSearchBar(true);
        const query = window.location.search.split('?')[1].split('&')[0].split('=')[1];
        const dates = window.location.search.split('?')[1].split('&')[1].split('=')[1];
        setQuery(query);
        setDates(dates);
        
        axios.post(`/search/${query}`).then((res) => {
            console.log("data",res.data);
            setQueryResults(res.data);
        }, (err) => {
            console.log("Error: ",err);
        });
    },[])

    return (
        <div>
            <Navbar enteredDates={enteredDates} enteredQuery={enteredQuery} />
            <SearchResultBody />
        </div>
    )
}

export default SearchResults;