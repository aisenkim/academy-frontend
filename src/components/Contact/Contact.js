import React from 'react'
import InfoSection from "../InfoSection/InfoSection";
import Footer from "../Footer/Footer";
import {contactUs} from "./Data";

const Contact = () => {
    return (
        <>
            <InfoSection {...contactUs} />
            <Footer/>
        </>
    )
}

export default Contact
