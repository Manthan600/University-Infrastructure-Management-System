import React, { useState } from "react";

const UserLogin = () => {
  return (
    <>
      <div className="max-w-md mx-auto p-4 bg-blue-300 shadow-md rounded-md">
        <h2 className="text-4xl text-center font-bold mb-4 mt-10">
          User Login
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition-all duration-300"
            >
              Login
            </button>
            <button
              type="button"
              className="text-blue-500 hover:underline hover:text-blue-800"
            >
              Add New User
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const TechnicianLogin = () => {
  return (
    <>
      <div className="max-w-md mx-auto p-4 bg-blue-300 shadow-md rounded-md">
        <h2 className="text-4xl text-center font-bold mb-4 mt-10">
          Technician Login
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              // onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition-all duration-300"
            >
              Login
            </button>
            <button
              type="button"
              className="text-blue-500 hover:underline hover:text-blue-800"
            >
              Add New User
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const AccountSection = () => {
  return (
    <>
      <div className="max-w-md mx-auto p-4 bg-blue-300 shadow-md rounded-md">
        <h2 className="text-4xl text-center font-bold mb-4 mt-10 ">
          Account Section Login
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              // onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition-all duration-300"
            >
              Login
            </button>
            <button
              type="button"
              className="text-blue-500 hover:underline hover:text-blue-800"
            >
              Add New User
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const FacultyLogin = () => {
  return (
    <>
      <div className="max-w-md mx-auto p-4 bg-blue-300 shadow-md rounded-md">
        <h2 className="text-4xl text-center font-bold mb-4 mt-10">
          Faculty Login
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              // onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition-all duration-300"
            >
              Login
            </button>
            <button
              type="button"
              className="text-blue-500 hover:underline hover:text-blue-800"
            >
              Add New User
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// main function of login component
const Login = () => {
  const [activeLink, setActiveLink] = useState("user");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
  };

  // Function to toggle menu open/close
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="bg-gray-800 p-5">
        <div className="container mx-auto flex justify-between items-center text-1xl">
          <div className="text-white font-bold">Our Logo UIMS</div>
          <div className="flex space-x-4 items-center">
            {/* Hamburger icon */}
            <button
              className="block sm:hidden text-white"
              onClick={toggleMenu} // Toggle menu on click
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>

            {/* for normal screens */}

            <div className="hidden sm:block">
              <button
                onClick={() => handleLinkClick("user")}
                className={`text-white ${
                  activeLink === "user" && "underline"
                } hover:text-pink-600 transition-all duration-300`}
              >
                User
              </button>
              <button
                onClick={() => handleLinkClick("technician")}
                className={`text-white ml-5 ${
                  activeLink === "technician" && "underline"
                } hover:text-pink-600 transition-all duration-300`}
              >
                Technician
              </button>
              <button
                onClick={() => handleLinkClick("account")}
                className={`text-white ml-5 ${
                  activeLink === "account" && "underline"
                } hover:text-pink-600 transition-all duration-300`}
              >
                Account Section
              </button>
              <button
                onClick={() => handleLinkClick("faculty")}
                className={`text-white ml-5 ${
                  activeLink === "faculty" && "underline"
                } hover:text-pink-600 transition-all duration-300`}
              >
                Faculty
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Responsive menu for small screens */}
      {menuOpen && (
        <div className="sm:hidden bg-gray-800 p-4">
          <button
            onClick={() => handleLinkClick("user")}
            className={`block text-white mb-2 ${
              activeLink === "user" && "underline"
            } hover:text-pink-600 transition-all duration-300`}
          >
            User
          </button>
          <button
            onClick={() => handleLinkClick("technician")}
            className={`block text-white mb-2 ${
              activeLink === "technician" && "underline"
            } hover:text-pink-600 transition-all duration-300`}
          >
            Technician
          </button>
          <button
            onClick={() => handleLinkClick("account")}
            className={`block text-white mb-2 ${
              activeLink === "account" && "underline"
            } hover:text-pink-600 transition-all duration-300`}
          >
            Account Section
          </button>
          <button
            onClick={() => handleLinkClick("faculty")}
            className={`block text-white mb-2 ${
              activeLink === "faculty" && "underline"
            } hover:text-pink-600 transition-all duration-300`}
          >
            Faculty
          </button>
        </div>
      )}
      {/* here based on selected user component is displayed */}
      <div className="container mx-auto p-4 m-9">
        {activeLink === "user" && <UserLogin />}
        {activeLink === "technician" && <TechnicianLogin />}
        {activeLink === "account" && <AccountSection />}
        {activeLink === "faculty" && <FacultyLogin />}
      </div>
    </>
  );
};

export default Login;
