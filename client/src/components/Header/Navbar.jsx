import { Link, useNavigate } from "react-router-dom";
import { Button, Drawer, Space } from "antd";
import { useAuth } from "../../context/Auth";
import { MenuOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
const Navbar = () => {
  const { isAuth, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { to: "/", label: "Home" },
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
    ],
    [],
  );

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  return (
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
               <div className="flex-shrink-0">
              <h1
                className="text-xl font-bold bg-blue-900 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => navigate("/")}
              >
                <UnorderedListOutlined className="!text-blue-900 !mr-2" />TODO LIST
              </h1>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                aria-label="Open menu"
                className="!border-0"
                icon={<MenuOutlined />}
                onClick={() => setIsMobileMenuOpen(true)}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block ">
              <div className="ml-10 flex items-center space-x-8">
                <ul className="ml-10 flex items-center space-x-8 list-none">
                  {navLinks.map((link) => (
                    <li
                      key={link.to}
                      className="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 group"
                    >
                      <Link to={link.to}>{link.label}</Link>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 group-hover:w-full transition-all duration-300"></span>
                    </li>
                  ))}
                  <li>
                    <Space size="middle">



                      {isAuth ? (
                        <>
                          <Button
                            className="!bg-blue-900 !text-white hover:shadow-lg transition-all duration-300"
                            onClick={() => {
                              navigate("/dashboard");
                            }}
                          >
                            Dashboard
                          </Button>
                          <Button
                            className="!bg-blue-900 !text-white hover:shadow-lg transition-all duration-300 "
                            onClick={handleLogout}
                          >
                            Logout
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            className="!bg-blue-900 !text-white hover:shadow-lg transition-all duration-300"
                            onClick={() => {
                              navigate("/auth/login");
                            }}
                          >
                            Login
                          </Button>
                          <Button
                            className="!bg-blue-900 !text-white hover:shadow-lg transition-all duration-300"
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

            {/* Mobile Drawer Menu */}
            <Drawer
              title="Menu"
              placement="right"
              open={isMobileMenuOpen}
              onClose={closeMobileMenu}
              width={320}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="py-2 text-gray-700 hover:text-blue-600 font-medium"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="h-px bg-gray-200 my-3" />

                {isAuth ? (
                  <div className="flex flex-col gap-2">
                    <Button
                      className="!bg-blue-900 !text-white"
                      onClick={() => {
                        closeMobileMenu();
                        navigate("/dashboard");
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      className="!bg-blue-900 !text-white"
                      onClick={() => {
                        closeMobileMenu();
                        handleLogout();
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      className="!bg-blue-900 !text-white"
                      onClick={() => {
                        closeMobileMenu();
                        navigate("/auth/login");
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      className="!bg-blue-900 !text-white"
                      onClick={() => {
                        closeMobileMenu();
                        navigate("/auth/register");
                      }}
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </Drawer>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
