"use client";

import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ContactForm from "@/components/pages/contact-page-components/ContactForm";
import MapSection from "@/components/pages/contact-page-components/MapSection";


const ContactPage = () => {
    return (
        <>
            <section className="container max-w-7xl mx-auto px-4 py-16">
                {/* Page Title */}
                <div className="mb-12">
                    <h1 className="text-2xl sm:text-3xl font-bold text-golden-dark">
                        Contact Us
                    </h1>
                    <div className="mt-2 h-1 w-12 bg-golden-dark rounded-full" />
                    <p className="text-gray-600 mt-4 max-w-2xl">
                        Get in touch with the MoMP’s Federal Office through any of the following avenues. The point of contact for email or telephone inquiries is
                    </p>
                </div>
                <ContactForm />
                <MapSection />

            </section>
        </>
    );
};

export default ContactPage;


