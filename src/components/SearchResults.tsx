import Navbar from "./Navbar";
import SearchResultBody from "./SearchResultBody";

interface Props {
    searchBar: boolean;
}

const SearchResults: React.FC<Props> = ({ searchBar }) => {
    return (
        <div>
            <Navbar searchBar={searchBar} />
            <SearchResultBody />
        </div>
    );
}

export default SearchResults;