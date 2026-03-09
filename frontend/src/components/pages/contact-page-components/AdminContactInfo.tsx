"use client";

import AdminFederalContact from "./AdminFederalContact";
import FooterSocialMedia from "./FooterSocialMedia";

export default function AdminContactInfo() {
    const handleSocialSave = (socialLinks: any) => {
        console.log("Saving social links:", socialLinks);
        // Add your API call here
    };

    return (
        <div className="space-y-6">
            <AdminFederalContact />
            <FooterSocialMedia onSave={handleSocialSave} />
        </div>
    );
}