"use client";

import React from "react";
import {
    MapPin,
    User,
    Phone,
    Mail,
    Building2,
} from "lucide-react";

const regionalOffices = [
    {
        region: "Amhara",
        bureau: "The Amhara National Regional State Mines Resource Development Expansion Agency",
        address: "Bahir Dar City, in front of Wisdom Tower",
        director: "Haile Abebe",
        email: "haileabebe89@yahoo.com",
        phone: "0918 35 28 87 / 058-222-00-58",
    },
    {
        region: "Dire Dawa",
        bureau: "Agriculture, Water, Mines and Energy Bureau",
        contact: "Ahmed Seid",
        address: "P.O Box 18, Dire Dawa",
        email: "ahmedsaeed.184@gmail.com",
        phone: "0913 24 06 45 / 025 111 09 65",
    },
    {
        region: "Oromia",
        bureau: "The Oromia Mines Resource Authority",
        address: "Addis Ababa",
        director: "Tesfaye Megersa",
        email: "tesfayemegersa211@gmail.com",
        phone: "0911 52 23 90 / 011 515 37 15",
    },
    {
        region: "Benishangul Gumuz",
        bureau: "Benishangul Gumuz Mines Resource Agency",
        address: "Asosa",
        director: "Asir Ebrahim",
        email: "asirebrahim@yahoo.com",
        phone: "0922 18 87 90 / 057 775 01 09",
    },
    {
        region: "Gambella",
        bureau: "Gambella Regional Mineral and Energy Resources Agency",
        address: "Gambella",
        director: "W/ro Akwata Cham Onyongo",
        email: "chamakwata@gmail.com",
        phone: "0923 03 55 82 / 047 551 04 04",
        extraContact: {
            name: "Ato Kuang Reit (Deputy Director)",
            email: "koangnyier@gmail.com",
            phone: "0911 96 26 65",
        },
    },
    {
        region: "Harari",
        bureau: "The Harari Bureau of Mines",
        address: "Harari Region, Jinella Woreda, Kebele 14",
        email: "ekarmziad@gmail.com",
        phone: "025-666-30-33",
    },
    {
        region: "Afar",
        bureau: "Afar Office of Mines and Petroleum",
        address: "Samara",
        director: "Gado Hamolo",
        email: "gadohamolo@yahoo.com",
        phone: "0911 23 80 26",
    },
    {
        region: "Sidama",
        bureau: "Sidama Mines and Energy Agency",
        address: "Hawassa",
        director: "Mesfin Mechuka",
        email: "mesfinmechuka@gmail.com",
        phone: "0916 83 01 35",
    },
    {
        region: "Addis Ababa",
        bureau: "Addis Ababa Environment Protection and Green Development Commission",
        address: "Addis Ababa",
        director: "Sisay Getachew (Commissioner)",
        phone: "0911 50 98 39 / 011 667 59 46",
    },
    {
        region: "Somali",
        bureau: "Somali Bureau of Mines, Energy and Petroleum",
        address: "Somali Region",
        director: "Abdinur Farah",
        email: "abdinur55@gmail.com",
        phone: "0902 61 16 00 / 057 752 22 00",
    },
    {
        region: "Tigray",
        bureau: "Tigray Mines and Energy Agency",
        address: "Mekelle",
        director: "Meaza Girmay",
        email: "meazagirmay12@gmail.com",
        phone: "0923 49 56 77 / 034 440 12 15",
    },
    {
        region: "SNNPR",
        bureau: "SNNPR Mines and Energy Agency",
        address: "Hawassa",
        director: "Eyasu Mamo",
        email: "eyasumamo@yahoo.com",
        phone: "+251 911 303 156",
    },
];

const RegionalOfficesPage = () => {
    return (
        <section className="container max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regionalOffices.map((office, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
                    >
                        <h3 className="text-lg font-semibold text-golden-dark mb-3">
                            {office.region}
                        </h3>

                        <p className="flex gap-2 text-sm text-gray-700 mb-2">
                            <Building2 size={16} />
                            {office.bureau}
                        </p>

                        <p className="flex gap-2 text-sm text-gray-600 mb-2">
                            <MapPin size={16} />
                            {office.address}
                        </p>

                        {office.director && (
                            <p className="flex gap-2 text-sm text-gray-600 mb-2">
                                <User size={16} />
                                {office.director}
                            </p>
                        )}

                        {office.email && (
                            <p className="flex gap-2 text-sm text-gray-600 mb-2">
                                <Mail size={16} />
                                {office.email}
                            </p>
                        )}

                        {office.phone && (
                            <p className="flex gap-2 text-sm text-gray-600">
                                <Phone size={16} />
                                {office.phone}
                            </p>
                        )}

                        {office.extraContact && (
                            <div className="mt-4 border-t pt-3 text-sm text-gray-600">
                                <p className="font-medium">Licensing Contact</p>
                                <p>{office.extraContact.name}</p>
                                <p>{office.extraContact.email}</p>
                                <p>{office.extraContact.phone}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RegionalOfficesPage;