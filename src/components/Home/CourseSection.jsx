
function CourseSection(){
    const courses = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Learn the basics of web development, including HTML, CSS, and JavaScript. Build your own websites and web applications from scratch.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  },
  {
    id: 2,
    title: "Video Editing",
    description:
      "Learn the fundamentals of video editing using industry-standard software. Create compelling visual stories and enhance your multimedia content.",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
  },
  {
    id: 3,
    title: "Graphic Design",
    description:
      "Explore the world of graphic design and learn how to create visually stunning designs using industry-standard tools and techniques.",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
  },
  {
    id: 4,
    title: "Basic Computer",
    description:
      "Learn the fundamentals of computer usage, including operating systems, file management, and basic troubleshooting techniques.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  },
  {
    id: 5,
    title: "Freelancing",
    description:
      "Learn the fundamentals of freelancing, including how to find clients, set rates, and manage projects effectively.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  },
  {
    id: 6,
    title: "Digital Marketing",
    description:
      "Learn the fundamentals of digital marketing, including social media marketing, search engine optimization (SEO), and email marketing.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },]
    return(
        <div id="courses" className="bg-white"><br/>
              <h2 className="text-3xl font-bold text-center mb-10">Our Courses</h2><br/>
        <div className=" grid m-4 grid-cols-1 md:grid-cols-3 gap-5">
{courses.map((course)=>(
    <div className=" bg-slate-100 p-5  shadow rounded-2xl" key={course.id}>
<img className="bg-cover rounded-t-2xl  bg-no-repeat" src={course.image}/>
<h2 className="text-xl p-3 font-bold">{course.title}</h2>
<br/>
<p className="p-3">{course.description}</p>
<br/>
 <a
  href="https://wa.me/923193248440"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-blue-900 buttom-5 left-7  text-white px-4 py-2 rounded"
>
  Detail on WhatsApp
</a>
        </div>
))}
        </div></div>
    )
}

export default CourseSection