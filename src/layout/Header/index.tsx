import "../../styles/index.css";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "../../components/Profile/Avatar";
import { useAuth } from "../../context/useAuth";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { FiMenu, FiPlus, FiChevronDown, FiList } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const products = [
  {
    name: "All Venues",
    description: "Show all venues",
    href: "/",
    icon: FiList,
  },
  {
    name: "Add Venue",
    description: "Create your own venue and publish it!",
    href: "/venues",
    icon: FiPlus,
  },
];

function Header() {
  const { user, isLoggedIn } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {}, [user, isLoggedIn]);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex flex-row lg:flex-1 gap-1 cursor-pointer">
          <NavLink to="/" className="flex items-center">
            <IoSunnyOutline className="text-accent h-8 w-8" />
            <span className="text-2xl text-secondary font-bold">Holidaze</span>
          </NavLink>
        </div>

        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex font-bold items-center justify-center rounded p-2.5 text-primary hover:bg-gray-200"
          >
            <FiMenu className="h-6 w-6" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:bg-tertiary active:bg-tertiary focus:bg-tertiary p-2 rounded">
              Venues
              <FiChevronDown
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400 group-hover:text-secondary"
              />
            </PopoverButton>
            <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded bg-white shadow-lg ring-1 ring-gray-900/5 transition">
              <div className="p-4">
                {products.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-x-6 rounded-md px-4 py-2 text-sm leading-6 hover:bg-gray-50 ${
                        isActive
                          ? "bg-gray-200 text-secondary"
                          : "text-gray-900"
                      }`
                    }
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded bg-gray-50 group-hover:bg-white">
                      <item.icon
                        className={`h-6 w-6  "text-secondary" : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div>
                      <span className="block font-semibold">{item.name}</span>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </NavLink>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <NavLink
            to={isLoggedIn && user ? `/profiles/${user.name}/bookings` : "#"}
            className={({ isActive }) =>
              `text-sm font-semibold leading-6 p-2 rounded ${
                isActive ? "bg-accent" : "text-gray-900 hover:bg-tertiary"
              }`
            }
          >
            My Bookings
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm font-semibold leading-6 p-2 rounded ${
                isActive ? "bg-accent" : "text-gray-900 hover:bg-tertiary"
              }`
            }
          >
            About
          </NavLink>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn && user ? (
            <Avatar />
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-md ${
                  isActive ? "text-secondary" : "hover:text-secondary"
                }`
              }
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </NavLink>
          )}
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <DialogPanel
          ref={menuRef}
          className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-xs sm:ring-1 sm:ring-gray-900/10"
        >
          <div className="flex flex-col space-y-6 justify-center items-center">
            {/* Logo and Close Button */}
            <div className="w-full flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Link to="/">
                  <IoSunnyOutline className="text-yellow-700 h-8 w-8" />
                </Link>
                <span className="text-2xl font-bold text-blue-700 ml-2">
                  Holidaze
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-danger focus:outline-none"
              >
                ✕
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <Disclosure as="div" className="space-y-4">
              <DisclosureButton className="flex items-center justify-between text-md font-semibold text-gray-900 hover:bg-gray-100 focus:bg-gray-200 p-3 rounded">
                Venues
                <FiChevronDown className="h-5 w-5 transition-transform group-data-[open]:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="space-y-3 text-center">
                {products.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `block text-md font-medium p-2 rounded ${
                        isActive ? "bg-accent" : "text-gray-700 hover:bg-accent"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </DisclosurePanel>
            </Disclosure>

            <NavLink
              to={isLoggedIn && user ? `/profiles/${user.name}/bookings` : "#"}
              className={({ isActive }) =>
                `block text-md font-medium p-3 rounded ${
                  isActive ? "bg-accent" : "text-gray-400 cursor-not-allowed"
                }`
              }
            >
              My Bookings
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block text-md font-medium p-3 rounded ${
                  isActive ? "bg-accent" : "text-gray-900 hover:bg-gray-100"
                }`
              }
            >
              About
            </NavLink>

            {isLoggedIn && user ? (
              <div className="mt-4">
                <Avatar />
              </div>
            ) : (
              <NavLink
                to="/login"
                className="text-md font-medium text-blue-700 hover:text-blue-800 mt-4 block"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </NavLink>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Header;
