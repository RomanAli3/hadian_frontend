
function HeroSection(){


 
    return(
       <main className="min-h-[90vh] bg-linear-to-r from-[#081529] via-[#0b1e3f] to-[#081529] flex items-center">

<div className="max-w-7xl mx-auto w-full px-6">

<div className="grid lg:grid-cols-2 gap-12 items-center">

{/* Left */}

<div>

<span className="inline-block px-4 py-2 rounded-full bg-blue-900 text-blue-300 text-sm tracking-wider">
LEARN • CREATE • INNOVATE
</span>

<h1 className="text-6xl font-bold text-white mt-8 leading-tight">
Learn.
<br />
Build.
<br />
<span className="text-yellow-400">
Create Impact.
</span>
</h1>

<p className="text-gray-300 mt-6 text-lg leading-8 max-w-xl">

Hadian Creative Lab is a Computer & IT institute where students gain practical skills through hands-on training, industry-focused courses, and real-world projects.

</p>

<div className="flex gap-4 mt-8">

<a href="#courses"  className="bg-yellow-400 cursor-pointer hover:bg-amber-400/80 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">

Explore Courses

</a>

<button className="border cursor-pointer hover:bg-white/20 border-white text-white px-6 py-3 rounded-lg">

About Us

</button>

</div>

</div>

{/* Right */}

<div className="flex justify-center relative">

<div className="absolute w-80 h-80 bg-blue-600 blur-[120px] opacity-40 rounded-full"></div>

<img
src="favicon.png"
className="relative w-96 drop-shadow-2xl animate-pulse"
/>

</div>

</div>

</div>

</main>
    )
}

export default HeroSection