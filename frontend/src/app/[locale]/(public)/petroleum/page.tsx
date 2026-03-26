import React from "react";
import Image from "next/image";

const petroleumData = {
  intro: {
    title: "Opportunities in Petroleum",
    image:
      "https://nomadsinn.com/momp/wp-content/uploads/2020/01/image001-1024x771.png",
    paragraphs: [
      "It is a particularly good time to invest in Ethiopia’s petroleum (oil) sector. Not only does Ethiopia have rich, untapped resources, but it also has a fiscal and regulative regime that is increasingly geared towards private sector investment.",
      "Ethiopia is located in the horn of Africa, which means the country is surrounded by successful petroleum discoveries. It shares its geology with the Middle East, East African Rift and Sudan region, all of which are famously oil rich. In terms of its geology, more than 30% of Ethiopia is covered with sedimentary rocks, which usually host natural gases and other hydrocarbons:",
      "25% of the country has already been mapped with Full Tensor Gravity, and the Ministry of Mines and Petroleum has already identified six (6) known basins that contain hydrocarbons, illustrated on the map below:",
      "Of these six basins, two are particularly exciting: The Southern Rift Basin and The Ogaden Basin.",
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
        "The Southern Ethiopian rift basin lies in the East Africa Rift system, one of the most significant rift systems on earth.",
        "It stretches thousands of kilometres from the Gulf of Aden right down to Mozambique.",
        "Impressive oil and gas finds have been made in other basins of this rift in recent years, notably in Kenya and Uganda.",
        "Mapping results for the Rift Basin are only just beginning to come in, but are promising so far: results indicate the presence of source and reservoir rocks.",
        "Oil and natural gas are generated from source rocks, and then migrate to reservoir rocks after formation.",
        "The presence of both kinds of rock is an excellent sign of high prospectivity.",
      ],
    },
    {
      title: "Facts about the Ogaden Basin",
      images: [
        "https://nomadsinn.com/momp/wp-content/uploads/2020/01/image011.jpg",
        "https://nomadsinn.com/momp/wp-content/uploads/2020/02/map6-EDITED-768x656.jpg",
      ],
      facts: [
        "The Ogaden Basin covers an area of some 350,000 square kilometers (135,000 square miles).",
        "It is divided into 21 blocks – shown on the accompanying map.",
        "Exploration of the area began as far back as the 1920s.",
        "It is geologically similar to a number of other basins that have turned out to be rich in oil in the Sudan and Yemen.",
        "The Ogaden basin has several striking geological features that make it an exciting site for exploration: both Structural and Stratigraphic traps have been found in the basin.",
        "So have a number of kinds of seals: the Urandab Formation (shale) and the Middle Hamanlei (shale intercalation), as well as Bokh shale, Transition Zone, and the Hamanlei Carbonates.",
      ],
    },
    {
      title: "Seismic Readings and Geophysics Results for the Ogaden Basin",
      image:
        "https://nomadsinn.com/momp/wp-content/uploads/2020/01/image015.png",
      facts: [
        "About 62000 Line KM Airborne geophysics: TFEM and Airborne Gravity data in Block 15 and 16.",
        "2D seismic data acquisition – 4500",
        "3D seismic data acquisition - 1063 Km2",
      ],
    },
    {
      title: "Activity in the Calub and Hilala oil fields",
      paragraphs: [
        "Several oil companies are already hard at work in the Ogaden Basin. We are most excited by:",
      ],
      facts: [
        "Calub - 2.7 TCF",
        "Hilala – 1.3 TCF",
        "El-Kuran – up to 1.5 TCF",
      ],
      extraText: "The Calub gas field was discovered in 1973, making it one of the earliest finds in the Ogaden Basin region. It has 11 wells – all of which are productive. It also has two reservoirs Adigrat – natural gas condensate (liquid) and Calub – dry gas.\n\nIn June 2018, the Chinese company oil and gas company Poly-GCL Petroleum Group began crude oil production tests in the Calub and Hilala oil fields. A development plan for both Calub and Hilala is currently under consideration. In 2019 it was announced that a 767-kilometre natural gas pipeline between Calub and Hilala to Djibouti port has also been approved, and construction will begin in the near future.",
    },
    {
      title: "Recent Discoveries in the Ogaden Basin",
      image:
        "https://nomadsinn.com/momp/wp-content/uploads/2020/01/image018.jpg",
      paragraphs: [
        "We can also confirm that two (2) discoveries have been made recently in Dohar and El Kuran. The El Kuran discovery was made by New Age Mining from the United Kingdom, and the Dohar discovery was made by Poly-GCL from China. Dohar is located between Calub and Hilala, where the company has drilled three wells so far. The petroleum reserve at Dohar is estimated at 3 TCF.",
        "The light oil discovery in Hilala area is another success story in the region.",
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

            {section.extraText && (
              <div className="space-y-4 pt-4">
                {section.extraText.split("\n\n").map((para, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default PetroleumPage;