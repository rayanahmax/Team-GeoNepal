import React from 'react'

const Services = () => {
    const services = [
    {
      id: 1,
      title: "Trekking & Hiking",
      description:
        "Professional guided treks through the Himalayas with experienced local guides and complete safety equipment.",
      image:
        "https://readdy.ai/api/search-image?query=professional%20trekking%20guide%20with%20backpack%20and%20hiking%20equipment%20on%20mountain%20trail%20with%20himalayan%20peaks%20in%20background%20clean%20white%20minimalist%20style&width=300&height=200&seq=16&orientation=landscape",
    },
    {
      id: 2,
      title: "Cultural Tours",
      description:
        "Immerse yourself in Nepal's rich culture, visiting ancient temples, monasteries, and traditional villages.",
      image:
        "https://readdy.ai/api/search-image?query=traditional%20nepali%20cultural%20items%20prayer%20wheels%20temple%20bells%20and%20colorful%20fabrics%20arranged%20on%20clean%20white%20minimalist%20background&width=300&height=200&seq=17&orientation=landscape",
    },
    {
      id: 3,
      title: "Adventure Sports",
      description:
        "Experience thrilling activities like white-water rafting, paragliding, and mountain biking in stunning locations.",
      image:
        "https://readdy.ai/api/search-image?query=adventure%20sports%20equipment%20paraglider%20helmet%20and%20rafting%20gear%20arranged%20on%20clean%20white%20minimalist%20background%20with%20mountain%20adventure%20theme&width=300&height=200&seq=18&orientation=landscape",
    },
    {
      id: 4,
      title: "Wildlife Safari",
      description:
        "Explore Nepal's national parks and witness incredible wildlife including rhinos, tigers, and exotic birds.",
      image:
        "https://readdy.ai/api/search-image?query=wildlife%20safari%20binoculars%20camera%20and%20nature%20exploration%20equipment%20on%20clean%20white%20minimalist%20background%20with%20jungle%20adventure%20theme&width=300&height=200&seq=19&orientation=landscape",
    },
  ];
  return (
    <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive travel solutions for your Nepal adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-full h-32 mb-6 overflow-hidden rounded-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Services