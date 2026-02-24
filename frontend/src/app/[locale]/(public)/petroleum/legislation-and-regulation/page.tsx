import React from "react";

const legislationData = {
  intro: [
    "Ethiopia is currently in the process of updating its petroleum legislation to make it more investor friendly. A new Proclamation containing notable improvements has been drafted and is progressing through the legislative process.",
    "In the meantime, the most important pieces of legislation for those investing in petroleum are summarized below. The proclamations are also included in full.",
  ],

  petroleumAgreements: {
    description:
      "Any company wishing to undertake petroleum operations in Ethiopia (including exploration and reconnaissance) is required to enter into a formal Agreement with the MoMP’s presiding Minister.",
    negotiableNote:
      "Ethiopia’s petroleum laws make many of the terms of such Agreements entirely negotiable.",
    determines: [
      "Royalties",
      "Safety requirements",
      "Environmental protection",
      "Accounting procedures",
      "Employment and training obligations",
      "Minimum working obligations, expenditures, and periodic surrender of areas",
      "Rights and obligations of the company",
      "Minister’s authority to inspect and control operations",
      "Reporting requirements and timelines",
      "Assignment or transfer of rights and obligations",
      "Revocation or termination conditions",
      "Dispute settlement mechanisms",
      "Extent of state participation",
      "Sanctions for non-compliance",
    ],
  },

  duration: {
    description:
      "The duration of a Petroleum Agreement is fixed by law and depends on the activities covered and whether it is exclusive or non-exclusive.",
    terms: [
      "Non-exclusive Petroleum Agreement: Maximum 2 years, renewable for an additional 2 years.",
      "Exclusive Petroleum Exploration Agreement: Initially up to 4 years, renewable twice (2 years each).",
      "Development and Production Agreement: Up to 25 years initially, renewable for 10 additional years.",
      "Additional extensions may be granted for natural gas evaluation, drilling, logging, testing, or plugging of wells.",
    ],
  },

  customs: {
    description:
      "Under Ethiopian law, companies engaged in petroleum operations are entitled to customs and tax exemptions.",
    benefits: [
      "Export petroleum duty-free.",
      "Import machinery and equipment duty and tax free.",
      "Import transportation equipment (aircraft, vessels, vehicles except sedan cars) duty free.",
      "Import fuels, chemicals, lubricants, seismic tapes, prefabricated structures and operational materials duty free.",
      "Re-export imported operational equipment duty free.",
    ],
  },

  reference:
    "For more information, please refer to the Ethiopian Petroleum Operations Proclamation (or any succeeding proclamations).",
};

const LegislationAndRegulation = () => {
  return (
    <div className="container mx-auto  py-12 space-y-12 ">
      

      {/* Intro */}
      <section className="space-y-4 text-gray-700 leading-relaxed">
        {legislationData.intro.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      {/* Petroleum Agreements */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Petroleum Agreements
        </h2>

        <p>{legislationData.petroleumAgreements.description}</p>
        <p className="italic text-gray-600">
          {legislationData.petroleumAgreements.negotiableNote}
        </p>

        <div>
          <h3 className="font-semibold mb-3">
            The Agreement determines:
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            {legislationData.petroleumAgreements.determines.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>
      </section>

      {/* Duration Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Duration of Petroleum Agreements
        </h2>

        <p>{legislationData.duration.description}</p>

        <ul className="list-disc pl-6 space-y-2">
          {legislationData.duration.terms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </section>

      {/* Customs Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Exemption from Customs Duties and Levies
        </h2>

        <p>{legislationData.customs.description}</p>

        <ul className="list-disc pl-6 space-y-2">
          {legislationData.customs.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </section>

      {/* Reference */}
      <section className="border-t pt-6 text-gray-600">
        <p>{legislationData.reference}</p>
      </section>
    </div>
  );
};

export default LegislationAndRegulation;