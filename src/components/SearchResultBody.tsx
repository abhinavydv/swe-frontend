import '../styles/SearchResultBody.css';

const SearchResultBody = () => {
    return (
        <div className='page'>
            <h1 className='heading'>Showing results for Place</h1>
            <div id='results'>
                {/* filters should be scrollable */}
                <div id='filters'>

                </div>
                {/* hotels should be scrollable */}
                <div id='hotels'>

                </div>
                {/* TODO: filters and hotels should be scrollable independently */}
            </div>
        </div>
    );
}

export default SearchResultBody;