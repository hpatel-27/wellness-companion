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
  const [showModal, setShowModal] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedLastName, setUpdatedLastName] = useState("");

  const handleEdit = () => {
    console.log("Clicked edit button");

    // Since we are editing set the values of the updated(...) state variables
    // to their saved values
    setUpdatedEmail(email);
    setUpdatedFirstName(firstName);
    setUpdatedLastName(lastName);

    // Show the modal so the user can interact with it
    setShowModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    // reset the values of the update(FirstName, LastName, Email) variables
    setUpdatedEmail("");
    setUpdatedFirstName("");
    setUpdatedLastName("");
    // close modal at the end
    setShowModal(false);
  };

  const handleModalClose = () => {
    console.log("handling close");
    // User did not want to save the changes they were making
    setUpdatedEmail("");
    setUpdatedFirstName("");
    setUpdatedLastName("");

    // close the modal
    setShowModal(false);
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

              <p className="font-medium text-sm text-gray-800 mb-2">
                {email || "None."}
              </p>
            </div>

            <div>
              <label
                htmlFor="first-name"
                className="block mb-2 text-md font-semibold text-gray-900"
              >
                First Name
              </label>

              <p className="font-medium text-sm mb-2">{firstName || "None."}</p>
            </div>

            <div>
              <label
                htmlFor="last-name"
                className="block mb-2 text-md font-semibold text-gray-900"
              >
                Last Name
              </label>

              <p className="font-medium text-sm text-gray-800 mb-2">
                {lastName || "None."}
              </p>
            </div>

            <div>
              <label
                htmlFor="date-joined"
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

        {/* Profile Modal to handle updating info */}
        {showModal && (
          <div className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-black/20 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
              <div className="relative p-4 bg-white rounded-2xl shadow-2xl sm:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Edit Profile
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent transition hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center cursor-pointer"
                    onClick={handleModalClose}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <form onSubmit={handleUpdate}>
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        value={username || ""}
                        disabled
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="updated-email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="updated-email"
                        name="updated-email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        value={updatedEmail || ""}
                        onChange={(e) => setUpdatedEmail(e.target.value)}
                        placeholder="example@email.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="updated-first-name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="updated-first-name"
                        name="updated-first-name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        value={updatedFirstName || ""}
                        onChange={(e) => setUpdatedFirstName(e.target.value)}
                        placeholder="John"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="updated-last-name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="updated-last-name"
                        name="updated-last-name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        value={updatedLastName || ""}
                        onChange={(e) => setUpdatedLastName(e.target.value)}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="text-white inline-flex items-end bg-blue-500 hover:bg-blue-600 transition focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-4 mr-1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
