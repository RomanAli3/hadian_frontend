import {Outlet} from 'react-router-dom'
import HeaderSection from '../components/headerSection'
import Footer from '../components/FooterSection'

function OutletPage(){
    return(
        <>
        <HeaderSection/>
        <Outlet/>
        <Footer/>
        </>
    )
}

export default OutletPage