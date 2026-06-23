"use client";

import React, { useState } from "react";
import PublicTenderList from "@/features/tenders/PublicTenderList";
import PublicVacancyList from "@/features/vacancies/PublicVacancyList";

const TenderAndVacanciesPage = () => {
  const [activeTab, setActiveTab] = useState<"tender" | "vacancy">("tender");

  return (
    <section className="container max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-golden-dark mb-4">
        Tenders & Vacancies
      </h1>

      <p className="text-gray-600 mb-6 max-w-2xl">
        Browse the latest tenders and job vacancies from the Ministry of
        Mines and Petroleum.
      </p>

      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveTab("tender")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition
            ${
              activeTab === "tender"
                ? "bg-golden-dark text-white"
                : "text-gray-600 hover:bg-golden-dark20"
            }`}
        >
          Tenders
        </button>

        <button
          onClick={() => setActiveTab("vacancy")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition
            ${
              activeTab === "vacancy"
                ? "bg-golden-dark text-white"
                : "text-gray-600 hover:bg-golden-dark20"
            }`}
        >
          Vacancies
        </button>
      </div>

      {activeTab === "tender" ? <PublicTenderList /> : <PublicVacancyList />}
    </section>
  );
};

export default TenderAndVacanciesPage;
