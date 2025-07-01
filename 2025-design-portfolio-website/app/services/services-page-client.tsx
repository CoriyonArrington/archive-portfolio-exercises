"use client"

const ServicesPageClient = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 bg-yellow-50 dark:bg-yellow-950/30 p-8 rounded-lg">
          {/* Service card 1: UX Research */}
          <div>
            <h3 className="text-xl font-semibold mb-2">UX Research</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We conduct thorough user research to understand your target audience, their needs, and pain points. This
              helps us create user-centered designs that are both effective and enjoyable to use.
            </p>
          </div>

          {/* Service card 2: UI Design */}
          <div>
            <h3 className="text-xl font-semibold mb-2">UI Design</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Our UI designers create visually appealing and intuitive interfaces that enhance the user experience. We
              focus on creating designs that are both aesthetically pleasing and easy to use.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 bg-yellow-50 dark:bg-yellow-950/30 p-8 rounded-lg">
          {/* Service card 3: Web Development */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Web Development</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We build responsive and scalable websites that meet your specific needs. Our developers use the latest
              technologies to create websites that are both functional and user-friendly.
            </p>
          </div>

          {/* Service card 4: Mobile App Development */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Mobile App Development</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We develop native and cross-platform mobile apps for iOS and Android. Our mobile app developers create
              apps that are both engaging and easy to use.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesPageClient
