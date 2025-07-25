import React from 'react'

const Featured = () => {
    const featuredCards = [
    {
      id: 1,
      title: "Mount Everest Base Camp Trek",
      description:
        "Experience the ultimate adventure with our guided trek to the world's highest peak base camp. Witness breathtaking Himalayan views and immerse yourself in Sherpa culture.",
      image:
        "https://readdy.ai/api/search-image?query=majestic%20mount%20everest%20base%20camp%20with%20prayer%20flags%20and%20trekkers%20in%20traditional%20himalayan%20landscape%20with%20snow-capped%20peaks%20and%20clear%20blue%20sky&width=400&height=300&seq=12&orientation=landscape",
    },
    {
      id: 2,
      title: "Kathmandu Cultural Heritage Tour",
      description:
        "Discover the rich cultural heritage of Nepal's capital city. Visit ancient temples, palaces, and UNESCO World Heritage sites in the heart of Kathmandu Valley.",
      image:
        "https://readdy.ai/api/search-image?query=ancient%20nepali%20temple%20architecture%20with%20intricate%20wood%20carvings%20golden%20details%20and%20traditional%20pagoda%20style%20buildings%20in%20kathmandu%20durbar%20square&width=400&height=300&seq=13&orientation=landscape",
    },
    {
      id: 3,
      title: "Annapurna Circuit Adventure",
      description:
        "Trek through diverse landscapes from subtropical forests to high alpine terrain. Experience local hospitality in mountain villages along this classic circuit.",
      image:
        "https://readdy.ai/api/search-image?query=annapurna%20mountain%20range%20with%20rhododendron%20flowers%20trekking%20path%20and%20traditional%20nepali%20mountain%20villages%20in%20beautiful%20himalayan%20valley%20landscape&width=400&height=300&seq=14&orientation=landscape",
    },
    {
      id: 4,
      title: "Pokhara Lake District",
      description:
        "Relax by the serene Phewa Lake with stunning reflections of the Annapurna range. Enjoy boating, paragliding, and exploring the peaceful lake city.",
      image:
        "https://readdy.ai/api/search-image?query=peaceful%20phewa%20lake%20in%20pokhara%20with%20mountain%20reflections%20colorful%20boats%20and%20himalayan%20peaks%20in%20background%20during%20golden%20hour%20lighting&width=400&height=300&seq=15&orientation=landscape",
    },
  ];
  return (
    <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Featured Destinations
            </h2>
            <p className="text-lg text-gray-600">
              Discover Nepal's most breathtaking locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {card.description}
                  </p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 !rounded-button font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap">
                    See More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Featured