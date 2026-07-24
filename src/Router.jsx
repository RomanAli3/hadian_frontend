import {Router,Routes,BrowserRouter,Route, Outlet} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ProjectPage from './pages/ProjectsPage.jsx'

import OutletPage from './pages/OutletPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
function RouterPage(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<OutletPage/>}>
            <Route index element={<HomePage/>} />
            <Route path='/About' element={<AboutPage/>}/>
            <Route path='/Projects' element={<ProjectPage/>}/>
            <Route path='/Profile' element={<ProfilePage/>}/>

            </Route>
        </Routes>
        </BrowserRouter>
    )
}

export default RouterPage