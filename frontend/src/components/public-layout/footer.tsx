import React from "react";
import Link from "next/link";
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Linkedin,
    Youtube,
    Instagram,
} from "lucide-react";
import Image from "next/image";
import { IconBrandTelegram, IconBrandTiktok } from "@tabler/icons-react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 bg-blur-md text-gray-300">
            {/* Top section */}
            <div className="max-w-7xl mx-auto px-6 py-6 md:py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* About */}
                <div className="flex justify-left items-start">
                    <div className="flex flex-col gap- justify-center items-center" >
                        <Image src="/logo-only.png" alt="Logo" width={100} height={100} />
                        <h3 className="text-base font-semibold text-golden-dark mb-4">
                            Ministry of Mines
                        </h3>

                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/mining" className="hover:text-golden-dark">
                                Mining Sector
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" className="hover:text-golden-dark">
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link href="/news" className="hover:text-golden-dark">
                                News & Updates
                            </Link>
                        </li>

                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Resources
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/mining/licensing-and-legislation" className="hover:text-golden-dark">
                                Licensing & Legislation
                            </Link>
                        </li>
                        <li>
                            <Link href="/mining/data" className="hover:text-golden-dark">
                                Mining Data
                            </Link>
                        </li>
                        <li>
                            <Link href="/mining/gemstones" className="hover:text-golden-dark">
                                Gemstones
                            </Link>
                        </li>
                        <li>
                            <Link href="/mining/application-portal" className="hover:text-golden-dark">
                                Application Portal
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Contact
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link href="/offices/federal" className="hover:text-golden-dark">
                                Federal Office
                            </Link>
                        </li>
                        <li>
                            <Link href="/offices/regional" className="hover:text-golden-dark">
                                Regional Offices
                            </Link>
                        </li>
                        <li>
                            <Link href="/faq" className="hover:text-golden-dark">
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link href="/stakeholder-consultations" className="hover:text-golden-dark">
                                Stakeholder Consultations
                            </Link>
                        </li>
                        <li>
                            <Link href="/tenders-and-vacancies" className="hover:text-golden-dark">
                                Tenders and Vacancies
                            </Link>
                        </li>
                        <li>
                            <Link href="/feedback-and-complaints" className="hover:text-golden-dark">
                                Feedback and Complaints
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 pb-5 flex flex-col  md:flex-row items-center justify-between text-sm">
                    {/* Social */}
                    <div className="flex gap-4  justify-left w-full md:w-fit mb-10 md:mb-0">
                        <a href="#" className="hover:text-golden-dark">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:text-golden-dark">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:text-golden-dark">
                            <Linkedin className="w-5 h-5" />
                        </a>

                        <a href="#" className="hover:text-golden-dark">
                            <Youtube className="w-5 h-5" />
                        </a>

                        <a href="#" className="hover:text-golden-dark">
                            <Instagram className="w-5 h-5" />
                        </a>

                    </div>

                    <p className="text-center w-full md:w-fit">
                        © {new Date().getFullYear()} Ministry of Mines – Ethiopia. All rights
                        reserved.
                    </p>


                </div>
            </div>
        </footer>
    );
};

export default Footer;
