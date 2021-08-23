import React from 'react'
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data'
import Pricing from "../Pricing/Pricing";
import InfoSection from "../InfoSection/InfoSection";
import Footer from "../Footer/Footer";

const Home = () => {
    return (
        <>
            <InfoSection {...homeObjOne} />
            <InfoSection {...homeObjTwo} />
            {/*<InfoSection {...homeObjThree} />*/}
            {/*<Pricing />*/}
            {/*<InfoSection {...homeObjFour} />*/}
            <Footer/>
        </>
    )
}

export default Home
