import { Link, useNavigate } from "react-router-dom";
import { Button, Space } from "antd";
import { useAuth } from "../../context/Auth";
const Navbar = () => {
  const { isAuth, handleLogout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-300">
                TODO LIST
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block ">
              <div className="ml-10 flex items-center space-x-8">
                <ul className="ml-10 flex items-center space-x-8 list-none">
                  <li className="relative text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 group">
                    <Link to="/">Home</Link>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
                  </li>
                  <li className="relative text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 group">
                    <Link to="/about">About</Link>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
                  </li>
                  <li className="relative text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 group">
                    <Link to="/contact">Contact</Link>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
                  </li>
                  <li>
                    <Space size="middle">
                      {isAuth ? (
                        <>
                          <Button
                            className="!bg-gradient-to-r from-green-500 to-green-900 !text-white hover:shadow-lg transition-all duration-300"
                            onClick={() => {
                              navigate("/dashboard");
                            }}
                          >
                            Dashboard
                          </Button>
                          <Button
                            className="!bg-gradient-to-r from-red-500 to-red-900 !text-white hover:shadow-lg transition-all duration-300 "
                            onClick={handleLogout}
                          >
                            Logout
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            className="!bg-gradient-to-r from-purple-500 to-indigo-900 !text-white hover:shadow-lg transition-all duration-300"
                            onClick={() => {
                              navigate("/auth/login");
                            }}
                          >
                            Login
                          </Button>
                          <Button
                            className="!bg-gradient-to-r from-purple-500 to-indigo-900 !text-white hover:shadow-lg transition-all duration-300"
                            onClick={() => {
                              navigate("/auth/register");
                            }}
                          >
                            Register
                          </Button>
                        </>
                      )}
                    </Space>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
