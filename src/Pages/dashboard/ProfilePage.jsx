import React, { useState } from "react";

const ProfilePage = () => {
  // Sample initial user data
  const initialUser = {
    image: "https://i.ibb.co.com/r2bwRmX5/DSC-1804seo.jpg",
    name: "Tasfik Hasan Tanim",
    email: "tasfiktanimofficial@gmail.com",
    phone: "+880 1234 567890",
    address: "Rajshahi, Bangladesh",
    bio: "Web developer and learner"
  };

  const [user, setUser] = useState(initialUser);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // You can integrate an API call here if needed
    console.log("Updated user data:", user);
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="flex-shrink-0">
          <img
            src={user.image}
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
          />
        </div>

        <div className="mt-4 md:mt-0 md:ml-6 flex-1 w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {/* Name */}
            <div>
              <label className="block font-semibold">Name:</label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              ) : (
                <p>{user.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold">Email:</label>
              <p>{user.email}</p> {/* Email usually not editable */}
            </div>

            {/* Phone */}
            <div>
              <label className="block font-semibold">Phone:</label>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              ) : (
                <p>{user.phone}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block font-semibold">Address:</label>
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              ) : (
                <p>{user.address}</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block font-semibold">Bio:</label>
              {editMode ? (
                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              ) : (
                <p>{user.bio}</p>
              )}
            </div>

            {editMode && (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 mt-2"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
