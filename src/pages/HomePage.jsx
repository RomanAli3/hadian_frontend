import CourseSection from "../components/Home/CourseSection"
import HeroSection from "../components/Home/HeroSection"
import StudensSection from "../components/Home/StudensSection"

function HomePage(){
    return(
        <main>
          <HeroSection/>
          <StudensSection/>
          <CourseSection/>
        </main>
    )
}

export default HomePage