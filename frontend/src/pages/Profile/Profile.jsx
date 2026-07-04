import MainLayout from "../../layouts/MainLayout";
import { useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Administrator",
    email: "admin@gmail.com",
    role: "Admin",
    department: "Information Technology",
    phone: "9876543210",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-500">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src="https://i.pravatar.cc/150"
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-blue-500"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
              <div>
                <label className="font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full mt-2 border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full mt-2 border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="font-medium">Role</label>
                <input
                  type="text"
                  value={profile.role}
                  disabled
                  className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-100"
                />
              </div>

              <div>
                <label className="font-medium">Department</label>
                <input
                  type="text"
                  name="department"
                  value={profile.department}
                  onChange={handleProfileChange}
                  className="w-full mt-2 border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  className="w-full mt-2 border rounded-lg px-4 py-3"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 text-right">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
              Save Changes
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Change Password</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="font-medium">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={password.currentPassword}
                onChange={handlePasswordChange}
                className="w-full mt-2 border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
                className="w-full mt-2 border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full mt-2 border rounded-lg px-4 py-3"
              />
            </div>
          </div>

          <div className="mt-8 text-right">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
