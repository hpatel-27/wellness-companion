import { useContext, useEffect, useState } from "react";
import userService from "../services/userService";
import { AuthContext } from "../contexts/AuthContext";
import { formatDate } from "../util/formatDate";

const Profile = () => {
  // Auth Context
  const { auth, setAuth } = useContext(AuthContext);

  // Profile variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [dateJoined, setDateJoined] = useState("");

  // For when the user is editing the profile
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    console.log("Clicked edit button");
    setIsEditing(true);
  };

  useEffect(() => {
    userService.getUserProfile(auth, setAuth).then((data) => {
      console.log(data);
      setFirstName(data.first_name || "");
      setLastName(data.last_name || "");
      setUsername(data.username || "");
      setEmail(data.email || "");
      setLastLogin(data.last_login || "");
      setDateJoined(data.date_joined || "");
    });
  }, [auth, setAuth]);

  return (
    <div className="min-h-screen md:h-auto bg-gray-100 px-6 py-8">
      <div className="max-w-xl mx-auto pt-15">
        <section className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex justify-between items-center pb-4 mb-4 border-b sm:mb-5">
            <h3 className="text-xl font-semibold text-gray-900">Profile</h3>
            <button
              type="button"
              className="h-8 w-8 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition flex items-center justify-center cursor-pointer"
              onClick={handleEdit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>

              <span className="sr-only">Edit Profile</span>
            </button>
          </div>

          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-md font-semibold text-gray-900"
              >
                Username
              </label>
              <p className="font-medium text-sm text-gray-800 mb-2">
                {username || "None."}
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-md font-semibold text-gray-900"
              >
                Email
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <p className="font-medium text-sm text-gray-800 mb-2">
                  {email || "None."}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="first-name"
                className="block mb-2 text-md font-semibold text-gray-900"
              >
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              ) : (
                <p className="font-medium text-sm mb-2">
                  {firstName || "None."}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="last-name"
                className="block mb-2 text-md font-semibold text-gray-900"
              >
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              ) : (
                <p className="font-medium text-sm text-gray-800 mb-2">
                  {lastName || "None."}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="last-name"
                className="block mb-2 text-md font-semibold text-gray-900"
              >
                Date Joined
              </label>
              <p className="font-medium text-sm text-gray-800 mb-2">
                {formatDate(dateJoined) || "None."}
              </p>
            </div>

            <div>
              <label
                htmlFor="last-login"
                className="block mb-2 text-md font-semibold text-gray-900"
              >
                Last Login
              </label>
              <p className="font-medium text-sm text-gray-800 mb-2">
                {lastLogin || "None."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
