import { useState } from "react";
import MainLayout from "../../layouts/mainLayout";
import { updateEmail, changePassword } from "../../api/profileApi";
import { logout } from "../../utils/auth";

const profile = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleEmailUpdate = async () => {
    if (!email) {
      alert("Please enter a new email");
      return;
    }

    try {
      const message = await updateEmail(email);

      alert(message);

      alert("Please login again with your new email.");

      logout();
    } catch (error) {
      alert(error.response?.data || "Failed to update email");
    }
  };

  const handlePasswordChange = async () => {
    if (
      !password.currentPassword ||
      !password.newPassword ||
      !password.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password.newPassword !== password.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const message = await changePassword({
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      });

      alert(message);

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert(error.response?.data || "Failed to update password");
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>

          <p className="text-gray-500">Update your email and password</p>
        </div>

        {/* Update Email */}

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Update Email</h2>

          <div>
            <label className="font-medium">New Email</label>

            <input
              type="email"
              placeholder="Enter new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 border rounded-lg px-4 py-3"
            />
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={handleEmailUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
              Update Email
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
                onChange={(e) =>
                  setPassword({
                    ...password,
                    currentPassword: e.target.value,
                  })
                }
                className="w-full mt-2 border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="font-medium">New Password</label>

              <input
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    newPassword: e.target.value,
                  })
                }
                className="w-full mt-2 border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="font-medium">Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full mt-2 border rounded-lg px-4 py-3"
              />
            </div>
          </div>

          <div className="mt-8 text-right">
            <button
              onClick={handlePasswordChange}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default profile;
