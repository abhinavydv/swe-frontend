import { useState } from "react";
import '../styles/Navbar.css'
import Topsection from "./Topsection";
import Middlesection from "./Middlesection";
import Bottomsection from "./Bottomsection";

function Navbar() {
    return (
        <div className='backGradient'>
            <Topsection />
            <Middlesection />
            <Bottomsection />
        </div>
    )
}

export default Navbar;