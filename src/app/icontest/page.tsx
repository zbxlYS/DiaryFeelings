"use client"


import { useState } from 'react';
import './icon.css';
const Page = () => {
    const [toggle, setToggle] = useState(false);
    return (
        <div className="test">
            <div className={`btn ${toggle ? 'toggle' : ''}`} onClick={() => setToggle(!toggle)}>
                <div className='circle'>

                </div>
            </div>
        </div>
    )
};

export default Page;