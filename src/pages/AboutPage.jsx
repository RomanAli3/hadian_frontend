function AboutPage() {
  return (
    <main>

      {/* Hero */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold">
            About <span className="text-yellow-400">Hadian Creative Hub</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-8">
            Hadian Creative Hub is a modern Computer & IT institute committed
            to providing practical skills through real-world projects,
            professional training and industry-focused courses.
          </p>

        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

          <div className="shadow-lg rounded-xl p-8 border">
            <i className="fa-solid fa-bullseye text-4xl text-yellow-500"></i>
            <h2 className="text-2xl font-bold mt-4">Our Mission</h2>
            <p className="mt-3 text-gray-600">
              To empower students with practical IT skills and prepare them
              for freelancing and professional careers.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-8 border">
            <i className="fa-solid fa-eye text-4xl text-blue-700"></i>
            <h2 className="text-2xl font-bold mt-4">Our Vision</h2>
            <p className="mt-3 text-gray-600">
              To become one of Pakistan's leading institutes in technology,
              innovation and creative education.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-8 border">
            <i className="fa-solid fa-star text-4xl text-yellow-500"></i>
            <h2 className="text-2xl font-bold mt-4">Why Choose Us?</h2>
            <p className="mt-3 text-gray-600">
              Expert trainers, project-based learning, affordable fee,
              certificates and career guidance.
            </p>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center">

          <div>
            <h2 className="text-5xl font-bold text-yellow-400">200+</h2>
            <p className="mt-2">Students</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-yellow-400">10+</h2>
            <p className="mt-2">Courses</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-yellow-400">95%</h2>
            <p className="mt-2">Success Rate</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-yellow-400">5+</h2>
            <p className="mt-2">Years Experience</p>
          </div>

        </div>
      </section>

      {/* Courses */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            Popular Courses
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              "Web Development",
              "Graphic Designing",
              "Video Editing",
              "Digital Marketing",
              "MS Office",
              "Freelancing"
            ].map((course) => (
              <div
                key={course}
                className="border rounded-xl shadow-lg p-8 hover:shadow-2xl transition"
              >
                <i className="fa-solid fa-graduation-cap text-4xl text-yellow-500"></i>
                <h3 className="text-2xl font-bold mt-5">{course}</h3>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Contact */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            Contact Information
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">

            <div className="border border-slate-700 rounded-xl p-8">
              <i className="fa-solid fa-phone text-yellow-400 text-4xl"></i>
              <h3 className="text-2xl mt-4 font-bold">Phone</h3>
              <p className="mt-3">+92 319 3248440</p>
            </div>

            <div className="border border-slate-700 rounded-xl p-8">
              <i className="fa-solid fa-envelope text-yellow-400 text-4xl"></i>
              <h3 className="text-2xl mt-4 font-bold">Email</h3>
              <p className="mt-3">hadiancreative@gmail.com</p>
            </div>

            <div className="border border-slate-700 rounded-xl p-8">
              <i className="fa-solid fa-location-dot text-yellow-400 text-4xl"></i>
              <h3 className="text-2xl mt-4 font-bold">Location</h3>
              <p className="mt-3">
                Dar ul Huda School,
                <br />
                Kot Momin,
                <br />
                District Sargodha
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default AboutPage;