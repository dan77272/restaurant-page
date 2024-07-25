// app/admin/page.tsx
import { getSession } from "../../../lib/getServerSession";
import AdminNavbar from "@/components/AdminNavbar";

const AdminPage = async () => {
  const session = await getSession();

  if (!session) {
    return <div>You must be signed in to view this page.</div>;
  }

  return (
    <div className="bg-gray-900 h-screen flex flex-col items-center">
      <h1 className="text-3xl text-white">Admin Dashboard</h1>
      <div className="grid grid-cols-10 w-full h-full">
        <AdminNavbar/>
        <div className="col-span-9 bg-white p-4">
          {/* Main content goes here */}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
