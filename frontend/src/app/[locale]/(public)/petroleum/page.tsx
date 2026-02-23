import React from "react";
import Image from "next/image";

const petroleumData = {
  intro: {
    title: "Opportunities in Petroleum",
    image:
      "https://nomadsinn.com/momp/wp-content/uploads/2020/01/image001-1024x771.png",
    paragraphs: [
      "It is a particularly good time to invest in Ethiopia’s petroleum sector.",
      "Ethiopia shares geology with the Middle East, East African Rift and Sudan region — all oil-rich.",
      "More than 30% of Ethiopia is covered with sedimentary rocks.",
      "Six hydrocarbon basins have been identified.",
      "Two particularly exciting basins: Southern Rift Basin and Ogaden Basin.",
    ],
  },

  sections: [
    {
      title: "Major Petroleum Basins",
      image:
        "https://nomadsinn.com/momp/wp-content/uploads/2020/01/image003-1024x697.png",
    },
    {
      title: "Facts about the Southern Rift Basin",
      images: [
        "https://nomadsinn.com/momp/wp-content/uploads/2020/01/image007-768x511.jpg",
        "https://nomadsinn.com/momp/wp-content/uploads/2020/01/image009.png",
      ],
      facts: [
        "Part of the East African Rift system.",
        "Extends from Gulf of Aden to Mozambique.",
        "Discoveries in Kenya and Uganda.",
        "Presence of source and reservoir rocks.",
      ],
    },
    {
      title: "Facts about the Ogaden Basin",
      images: [
        "https://nomadsinn.com/momp/wp-content/uploads/2020/01/image011.jpg",
        "https://nomadsinn.com/momp/wp-content/uploads/2020/02/map6-EDITED-768x656.jpg",
      ],
      facts: [
        "Covers 350,000 sq km.",
        "Divided into 21 blocks.",
        "Geologically similar to Sudan and Yemen.",
      ],
    },
    {
      title: "Seismic Readings and Geophysics Results",
      image:
        "https://nomadsinn.com/momp/wp-content/uploads/2020/01/image015.png",
      facts: [
        "62,000 Line KM airborne geophysics.",
        "2D seismic – 4500 km.",
        "3D seismic – 1063 km².",
      ],
    },
    {
      title: "Recent Discoveries in the Ogaden Basin",
      image:
        "https://nomadsinn.com/momp/wp-content/uploads/2020/01/image018.jpg",
      paragraphs: [
        "Discoveries in Dohar and El Kuran.",
        "Dohar reserve estimated at 3 TCF.",
        "Light oil discovery in Hilala.",
      ],
    },
  ],
};

const PetroleumPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">

      {/* HERO SECTION (FIRST IMAGE FULL WIDTH) */}
      <section className="space-y-8">


        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden ">
          <Image
            src={petroleumData.intro.image}
            alt={petroleumData.intro.title}
            fill
            className="object-contain"
          />
        </div>

        {petroleumData.intro.paragraphs.map((p, i) => (
          <p key={i} className="text-gray-700 leading-relaxed">
            {p}
          </p>
        ))}
      </section>

      {/* OTHER SECTIONS (HORIZONTAL LAYOUT) */}
      {petroleumData.sections.map((section, index) => (
        <section
          key={index}
          className="grid md:grid-cols-2 gap-12 items-center border-t pt-12"
        >
          {/* IMAGE SIDE */}
          <div className="space-y-6">
            {section.image && (
              <div className="relative w-full h-[350px] rounded-xl overflow-hidden ">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {section.images &&
              section.images.map((img, i) => (
                <div
                  key={i}
                  className="relative w-full h-[250px] rounded-xl overflow-hidden "
                >
                  <Image
                    src={img}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
          </div>

          {/* CONTENT SIDE */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
              {section.title}
            </h2>

            {section.paragraphs &&
              section.paragraphs.map((p, i) => (
                <p key={i} className="text-gray-700 leading-relaxed">
                  {p}
                </p>
              ))}

            {section.facts && (
              <ul className="list-disc pl-6 space-y-2">
                {section.facts.map((fact, i) => (
                  <li key={i}>{fact}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default PetroleumPage;