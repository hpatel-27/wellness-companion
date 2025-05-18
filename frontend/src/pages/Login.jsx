import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import journalLogo from "../assets/journal-bookmark.svg";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
      .then(() => navigate("/journal"))
      .catch((err) => setError(err.message));
  };

  // On load check to see if the user is authenticated.
  // If so, just send them to Home
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  });

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="/login"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            <img className="w-8 h-8 mr-2" src={journalLogo} alt="logo" />
            <span className="font-bold text-2xl">Wellness Journal</span>
          </a>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              {error && (
                <p className="mt-2 text-center text-red-400">{error}</p>
              )}

              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:bg-gray-50 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm/6"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:bg-gray-50 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm/6"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-400 hover:bg-blue-500 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="font-medium text-blue-500 hover:underline"
                  >
                    Register here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
