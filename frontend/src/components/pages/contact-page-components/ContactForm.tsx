"use client";

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react';
import { useGetFederalOfficesQuery } from '@/redux/api/federalOfficeApi';

const ContactForm = () => {
    const { data: federalOffices, isLoading, isError } = useGetFederalOfficesQuery();
    const office = federalOffices?.[0]; // Get first office from index 0

    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-golden-dark" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT SIDE – CONTACT INFO */}
            <div className="space-y-3">
                <InfoCard
                    icon={<MapPin className="text-golden-dark" />}
                    title="Office Address"
                    value={office?.office_address || "4 Kilo, Addis Ababa, Ethiopia"}
                />

                <InfoCard
                    icon={<Phone className="text-golden-dark" />}
                    title="Phone Number"
                    value={office?.phone || "+251 111 704 900"}
                />

                <InfoCard
                    icon={<Mail className="text-golden-dark" />}
                    title="Email Address"
                    value={office?.email || "info@midi.gov.et"}
                />
            </div>

            {/* RIGHT SIDE – CONTACT FORM */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-golden-dark mb-6">
                    Send Us a Message
                </h2>

                <form className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label>Full Name</label>
                            <Input placeholder="Enter your name" className="h-11" />
                        </div>
                        <div className="space-y-2">
                            <label>Email Address</label>
                            <Input placeholder="example@mail.com" className="h-11" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label>Subject</label>
                        <Input placeholder="Message subject" className="h-11" />
                    </div>
                    <div className="space-y-2">
                        <label>Message</label>
                        <Textarea
                            rows={5}
                            placeholder="Write your message here..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-golden-dark hover:bg-golden-darkHover text-white py-4 rounded-xl flex items-center justify-center gap-2 transition"
                    >
                        Send Message
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;

/* ---------------- COMPONENTS ---------------- */

const InfoCard = ({ icon, title, value }: any) => (
    <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            {icon}
        </div>
        <div>
            <p className="font-semibold text-golden-dark">{title}</p>
            <p className="text-gray-600 text-sm">{value}</p>
        </div>
    </div>
);