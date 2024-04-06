import '../styles/Navbar.css'
import Topsection from "./Topsection";
import Middlesection from "./Middlesection";
import Bottomsection from "./Bottomsection";

interface Props {
    searchBar: boolean;
}

const Navbar: React.FC<Props> = ({ searchBar }) => {
    return (
        <div className='backGradient'>
            <Topsection />
            <Middlesection />
            <Bottomsection searchBar={searchBar} />
        </div>
    )
}

export default Navbar;