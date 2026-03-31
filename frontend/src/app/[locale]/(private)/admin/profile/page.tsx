import AdminProfile from "@/components/pages/profile-page-components/AdminProfile";

export const metadata = {
  title: "Profile | Admin Dashboard",
  description: "View and manage your profile details.",
};

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-6 max-h-[85vh] overflow-y-auto w-full mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-golden-dark">My Profile</h2>
            <p className="text-muted-foreground">View your account details and access levels.</p>
        </div>
      </div>
      <AdminProfile />
    </div>
  );
}
