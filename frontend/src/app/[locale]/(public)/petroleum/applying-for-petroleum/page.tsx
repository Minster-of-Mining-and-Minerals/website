"use client";
import React from "react";
import Image from "next/image";

const petroleumData = {
  title: "Petroleum blocks currently open for applications and bids",
  description:
    "Ethiopia currently has the following blocks available for petroleum investors:",
  images: {
    concessionMap:
      "https://nomadsinn.com/momp/wp-content/uploads/2021/04/Concession-Map.jpg",
    processSingle:
      "https://nomadsinn.com/momp/wp-content/uploads/2020/02/Process-1-updated.jpg",
    processMultiple:
      "https://nomadsinn.com/momp/wp-content/uploads/2020/02/Process-2.jpg",
  },
  ppsa: {
    title: "Signing a Petroleum Production Sharing Agreement",
    description:
      "Companies wishing to extract petroleum from Ethiopia are required sign a Petroleum Production Sharing Agreement (PPSA) with the Government of Ethiopia.",
    subTitle: "Six features to expect in a PPSA:",
    features: [
      "The exploration period will be capped at 8 years in total",
      "The production period is 25 years, with a possible 10-year extension",
      "Income tax is set at 25%",
      "All other fiscal terms are entirely negotiable",
      "All operation costs are 100% recoverable",
      "All facilities/equipment used for petroleum exploration or production can be imported duty free. Any unused equipment can also be exported again duty free.",
    ],
  },
  negotiation: {
    title: "How to negotiate a PPSA",
    description:
      "To improve efficiency, the MoMP does not require a company to go through a formal bidding process when only one company is interested in a particular block. So there are two possible processes for negotiating a PPSA:",
    introText: [
      "One process is followed if only one company is interested in particular block.",
      "The other process is followed if more than one company expresses interest in the same block.",
    ],
    processes: [
      {
        title: "Process 1: for a single company applying",
        imageKey: "processSingle",
      },
      {
        title: "Process 2: when there are multiple bidders for a block",
        imageKey: "processMultiple",
        subSections: [
          {
            title: "Process 2: issuing a call for bids",
            details: [
              "If more than one company wants a license for the same block, a bid round will be floated. A formal notice will be published in the Ethiopian Herald (a national English-language newspaper).",
              "The notice will also be posted on the Ministry’s website under Tenders and Vacancies",
              "The bid notice will stay up at least for 45 days.",
            ],
          },
          {
            title: "Process 2: collecting bid documents",
            details: [
              "Bid documents will be prepared and can be collected from the Ministry at the applicant’s convenience. The bid documents will clearly specify:",
              "When the bidding opens and closes",
              "How each bid will be evaluated and scored",
            ],
          },
          {
            title: "Process 2: a model PPSA",
            details: [
              "The MoMP has a model Petroleum Production Sharing Agreement (PPSA), which can be viewed here. This model PPSA will provide guidance to investors on the expectations for the process of finalizing the agreement.",
            ],
          },
          {
            title: "Process 2: Finalizing the agreement",
            details: [
              "The MoMP will then:",
              "Evaluate each bidder based on the score cards that are clearly set out in the bid documents",
              "Notify every bidder of the result timeously",
              "Arrange a signing ceremony with the winning bidder.",
            ],
          },
        ],
      },
    ],
  },
};

const ApplyingForPetroleumPage = () => {
  return (
    <div className="container mx-auto  py-10 space-y-10">
      <h1 className="text-3xl font-bold">{petroleumData.title}</h1>

      <p>{petroleumData.description}</p>

      {/* Concession Map */}
      <div className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-md">
        <Image
          src={petroleumData.images.concessionMap}
          alt="Concession Map"
          fill
          className="object-contain"
        />
      </div>

      {/* PPSA Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{petroleumData.ppsa.title}</h2>
        <p>{petroleumData.ppsa.description}</p>

        {petroleumData.ppsa.subTitle && (
          <h3 className="text-xl font-medium pt-2">
            {petroleumData.ppsa.subTitle}
          </h3>
        )}

        <ul className="list-disc pl-6 space-y-2">
          {petroleumData.ppsa.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>

      {/* Negotiation Section */}
      <section className="space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {petroleumData.negotiation.title}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {petroleumData.negotiation.description}
          </p>
          {petroleumData.negotiation.introText?.map((text, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {text}
            </p>
          ))}
        </div>

        {/* Process Images Side-by-Side */}
        <div className="grid md:grid-cols-2 gap-8">
          {petroleumData.negotiation.processes.map((process, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-semibold text-center">
                {process.title}
              </h3>
              <div className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-md">
                <Image
                  src={
                    petroleumData.images[
                    process.imageKey as keyof typeof petroleumData.images
                    ]
                  }
                  alt={process.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Process Details Below */}
        <div className="space-y-12 pt-12 border-t">
          {petroleumData.negotiation.processes.map(
            (process, index) =>
              process.subSections && (
                <div key={index} className="space-y-8">
                  <h3 className="text-2xl font-semibold">{process.title}</h3>
                  {process.subSections.map((sub, subIndex) => (
                    <div key={subIndex} className="space-y-3">
                      <h4 className="text-lg font-medium">{sub.title}</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        {sub.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="text-gray-700 leading-relaxed"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )
          )}
        </div>
      </section>
    </div>
  );
};

export default ApplyingForPetroleumPage;