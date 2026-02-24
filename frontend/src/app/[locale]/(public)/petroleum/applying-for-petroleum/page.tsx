"use client";
import React from "react";
import Image from "next/image";

const petroleumData = {
  title: "Petroleum Blocks Currently Open for Applications and Bids",
  description:
    "Ethiopia currently has the following blocks available for petroleum investors.",
  images: {
    concessionMap:
      "https://nomadsinn.com/momp/wp-content/uploads/2021/04/Concession-Map.jpg",
    processSingle:
      "https://nomadsinn.com/momp/wp-content/uploads/2020/02/Process-1-updated.jpg",
    processMultiple:
      "https://nomadsinn.com/momp/wp-content/uploads/2020/02/Process-2.jpg",
  },
  ppsa: {
    title: "Signing a Petroleum Production Sharing Agreement (PPSA)",
    description:
      "Companies wishing to extract petroleum from Ethiopia are required to sign a Petroleum Production Sharing Agreement (PPSA) with the Government of Ethiopia.",
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
    description:
      "To improve efficiency, the MoMP does not require a company to go through a formal bidding process when only one company is interested in a particular block.",
    processes: [
      {
        title: "Process 1: For a Single Company Applying",
        imageKey: "processSingle",
      },
      {
        title: "Process 2: When There Are Multiple Bidders",
        imageKey: "processMultiple",
        steps: [
          {
            subtitle: "Issuing a Call for Bids",
            details: [
              "A formal notice will be published in the Ethiopian Herald (national English-language newspaper).",
              "The notice will also be posted on the Ministry’s website under Tenders and Vacancies.",
              "The bid notice will stay up at least for 45 days.",
            ],
          },
          {
            subtitle: "Collecting Bid Documents",
            details: [
              "Bid documents will be prepared and collected from the Ministry.",
              "Documents will specify when bidding opens and closes.",
              "Documents will specify how each bid will be evaluated and scored.",
            ],
          },
          {
            subtitle: "Model PPSA",
            details: [
              "The MoMP has a model Petroleum Production Sharing Agreement (PPSA) to guide investors in finalizing agreements.",
            ],
          },
          {
            subtitle: "Finalizing the Agreement",
            details: [
              "Evaluate each bidder based on score cards in the bid documents.",
              "Notify every bidder of the result.",
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
        <h2 className="text-2xl font-semibold">
          {petroleumData.ppsa.title}
        </h2>
        <p>{petroleumData.ppsa.description}</p>

        <ul className="list-disc pl-6 space-y-2">
          {petroleumData.ppsa.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>

      {/* Negotiation Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          How to Negotiate a PPSA
        </h2>
        <p>{petroleumData.negotiation.description}</p>

        {petroleumData.negotiation.processes.map((process, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-semibold">{process.title}</h3>

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

            {process.steps &&
              process.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="pl-4">
                  <h4 className="font-medium">{step.subtitle}</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default ApplyingForPetroleumPage;