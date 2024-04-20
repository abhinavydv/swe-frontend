import '../styles/Navbar.css'
import Topsection from "./Topsection";
import Middlesection from "./Middlesection";
import Bottomsection from "./Bottomsection";

interface Props {
    enteredQuery: string | null;
    enteredDates: string | null;
}

const Navbar: React.FC<Props> = ({ enteredQuery, enteredDates }) => {
    return (
        <div className='backGradient'>
            <Topsection />
            <Middlesection />
            <Bottomsection enteredDates={enteredDates} enteredQuery={enteredQuery} />
        </div>
    )
}

export default Navbar;