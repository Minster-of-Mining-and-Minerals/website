import React from "react";
import { FileText, Download } from "lucide-react";

const legislationData = {
  intro: [
    "Ethiopia is currently in the process of updating its petroleum legislation to make it more investor friendly. A new Proclamation containing some notable improvements has been drafted and is working its way through the legislative process.",
    "In the meantime, the most important pieces of legislation for those investing in petroleum, are summarized here. The proclamations are also included in full.",
  ],

  petroleumAgreements: {
    title: "Petroleum Agreements",
    description:
      "Any company wishing to undertake petroleum operations in Ethiopia of any kind (including exploration and reconnaissance) is required to enter into a formal Agreement with the MoMP’s presiding Minister.",
    negotiableNote:
      "Ethiopia’s laws governing petroleum activities make many of the terms of such Agreements entirely negotiable.",
    subTitle: "The Agreement between the company and the Minister will, among other things, determine the following:",
    determines: [
      "Royalties",
      "Safety requirements",
      "Environmental protection",
      "Accounting procedures",
      "Employment and training obligations",
      "Minimum working obligations, minimum expenditures and the periodic surrender of areas subject to the Agreement",
      "The rights and obligations of the company",
      "The extent of the Minister’s authority to inspect and control the operations",
      "What information needs to be reported to the Minister, and when",
      "How to assign or transfer of the company’s rights and obligation as set up under the Agreement",
      "How the Agreement might be revoked or terminated",
      "How disputes might be settled",
      "The extent of the state’s participation in the operations",
      "The sanctions for any failure to comply with the obligations set out in the Agreement",
    ],
  },

  duration: {
    title: "The Duration of Petroleum Agreements",
    description:
      "The duration of a Petroleum Agreement is currently fixed by law, and depends on the kinds of activities it covers and whether it is issued exclusively or not.",
    terms: [
      "The Minister will only enter into any kind of non-exclusive Petroleum Agreement for a maximum period of 2 years. However, this can be renewed for a further 2 years.",
      "An (exclusive) Petroleum Exploration Agreement may initially be granted for a maximum of 4 years, and renewed twice more with each renewal lasting 2 years.",
      "A development and production agreement may be granted for up to 25 years initially, and may be renewed for a further 10 years.",
      "Some allowances are made for evaluating natural gases, in addition to the drilling, logging, testing or plugging of any well. Companies engaged in such activities might be allowed additional extensions.",
    ],
  },

  customs: {
    title: "Exemption from customs duties and levies",
    description:
      "Under Ethiopian law, companies engaged in petroleum operations are entitled to export petroleum duty-free. They are also allowed to import any and all machinery and equipment they need for their operations, duty and tax free as well. This includes transportation equipment, such as aircraft, vessels, and vehicles as well as parts for that equipment (apart from sedan cars). Fuels, chemicals, lubricants, films, seismic tapes, house trailers, disassembled prefabricated structures and other materials the company needs to conduct its operations are also included. Equipment imported for these purposes can also be exported again duty free.",
  },

  reference:
    "For more information please see the Ethiopian Petroleum Operations Proclamation (or any succeeding proclamations).",

  importantProclamations: [
    { title: "Ethiopia Geothermal Resources Development Proclamation 981_2016", type: "PDF" },
    { title: "Geothermal Operation Application Directive 002_2012", type: "PDF" },
    { title: "Geothermal Regulation 453_2019", type: "PDF" },
    { title: "Ethiopian Petroleum Operations Proclamation no. 295/1986 Income Tax Proclamation no. 979/2016", type: "PDF" },
    { title: "Petroleum and Petroleum Products Supply Operations No. 838/2014", type: "PDF" },
    { title: "Environmental Impact Assessment Proclamation no. 299/2002", type: "PDF" },
    { title: "Commercial Registration and Licensing Proclamation No 980/2016", type: "PDF" },
    { title: "Cooperative Society Proclamation No. 985/2016", type: "PDF" },
    { title: "Organizations of Civil Societies Proclamation No. 1113/2019", type: "PDF" },
    { title: "Establishment of Cooperative Association Proclamation No.274/2002", type: "PDF" },
    { title: "Rural land Administration and land use Proclamation No. 456/2005", type: "PDF" },
    { title: "Labour Proclamation No. 377/2003", type: "PDF" },
    { title: "የኢታኖልና ቤንዚን ድብልቅ መመሪያ", type: "PDF" },
  ],
};

const LegislationAndRegulation = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Content (Left, 2/3) */}
        <div className="lg:col-span-2 space-y-12">
          {/* Intro */}
          <section className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Petroleum Legislation and Regulation</h1>
            <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
              {legislationData.intro.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Petroleum Agreements */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-2">{legislationData.petroleumAgreements.title}</h2>
            <p className="text-gray-700 leading-relaxed">{legislationData.petroleumAgreements.description}</p>
            <p className="italic text-gray-600 bg-gray-50 p-4 rounded-lg border-l-4 border-gray-300">
              {legislationData.petroleumAgreements.negotiableNote}
            </p>
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">{legislationData.petroleumAgreements.subTitle}</h3>
              <ul className="grid md:grid-cols-2 gap-y-2 gap-x-6 list-disc pl-5 text-gray-700">
                {legislationData.petroleumAgreements.determines.map((item, index) => (
                  <li key={index} className="pl-1">{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Duration Section */}
          <section className="space-y-6 pt-6 border-t">
            <h2 className="text-2xl font-semibold border-b pb-2">{legislationData.duration.title}</h2>
            <p className="text-gray-700 leading-relaxed">{legislationData.duration.description}</p>
            <ul className="space-y-4">
              {legislationData.duration.terms.map((term, index) => (
                <li key={index} className="flex gap-4 items-start bg-blue-50/30 p-4 rounded-xl">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{term}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Customs Section */}
          <section className="space-y-6 pt-6 border-t">
            <h2 className="text-2xl font-semibold border-b pb-2">{legislationData.customs.title}</h2>
            <p className="text-gray-700 leading-relaxed">{legislationData.customs.description}</p>
          </section>

          {/* Reference */}
          <section className="bg-gray-900 text-white p-8 border rounded-2xl shadow-xl">
            <p className="text-lg font-medium  text-gray-500">{legislationData.reference}</p>
          </section>
        </div>

        {/* Sidebar (Right, 1/3) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Important Proclamations
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {legislationData.importantProclamations.map((doc, index) => (
                  <div
                    key={index}
                    className="group flex flex-col p-3 rounded-xl hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm font-medium text-gray-800 leading-snug group-hover:text-blue-700">
                        {doc.title}
                      </span>
                      <button className="flex-shrink-0 p-2 rounded-lg bg-gray-100 group-hover:bg-blue-600 text-gray-500 group-hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="mt-1 text-[10px] uppercase tracking-wider font-bold text-gray-400 group-hover:text-blue-400">
                      {doc.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Contact/Info Card */}
            <div className="text-gray-500 rounded-2xl p-6  shadow-lg">
              <h4 className="text-lg font-bold mb-2">Need Help?</h4>
              <p className="text-sm opacity-90 mb-4">Contact our legal department for detailed inquiries regarding petroleum legislation.</p>
              <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegislationAndRegulation;