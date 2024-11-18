import "../../styles/index.css";
import { useEffect, useRef, useState } from "react";
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
          <Link to="/" className="flex items-center">
            <IoSunnyOutline className="text-accent h-8 w-8" />
            <span className="text-2xl text-secondary font-bold">holidaze</span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded p-2.5 text-gray-700 hover:bg-gray-200"
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
                  <Link
                    key={item.name}
                    to={item.href}
                    className="group relative flex items-center gap-x-6 rounded-md px-4 py-2 text-sm leading-6 hover:bg-gray-50 focus:bg-secondary focus:text-white active:bg-secondary active:text-white focus:ring-2 focus:ring-secondary"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded bg-gray-50 group-hover:bg-white">
                      <item.icon className="h-6 w-6 text-gray-600 group-hover:text-secondary" />
                    </div>
                    <div>
                      <span className="block font-semibold text-gray-900">
                        {item.name}
                      </span>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          {isLoggedIn && user ? (
            <Link
              to={`/profiles/${user.name}/bookings`}
              className="text-sm font-semibold leading-6 text-gray-900 hover:bg-tertiary active:bg-tertiary focus:bg-tertiary p-2 rounded"
            >
              My Bookings
            </Link>
          ) : (
            <div className="flex items-center">
              <span className="text-sm text-center leading-6 text-gray-900">
                My Bookings
              </span>
            </div>
          )}

          <Link
            to="/about"
            className="text-sm font-semibold leading-6 text-gray-900 hover:bg-tertiary active:bg-tertiary focus:bg-tertiary p-2 rounded"
          >
            About
          </Link>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn && user ? (
            <Avatar />
          ) : (
            <Link
              to="/login"
              className="text-md hover:text-secondary active:text-white"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 z-10"></div>
      )}

      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <DialogPanel
          ref={menuRef}
          className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="flex items-center">
                <IoSunnyOutline className="text-yellow-700 h-8 w-8" />
                <span className="text-2xl font-bold text-blue-800">
                  holidaze
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-red-600 focus:outline-none"
              >
                ✕
              </button>
            </div>

            <Disclosure as="div" className="space-y-4">
              <DisclosureButton className="flex items-center justify-between text-md font-semibold text-gray-900 hover:bg-gray-100 focus:bg-gray-200 p-3 rounded">
                Venues
                <FiChevronDown className="h-5 w-5 transition-transform group-data-[open]:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="pl-4 space-y-3">
                {products.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-md font-medium text-gray-700 hover:bg-gray-100 p-2 rounded"
                  >
                    {item.name}
                  </Link>
                ))}
              </DisclosurePanel>
            </Disclosure>

            {isLoggedIn && user ? (
              <Link
                to={`/profiles/${user.name}/bookings`}
                className="block text-md font-medium text-gray-900 hover:bg-gray-100 p-3 rounded"
              >
                My Bookings
              </Link>
            ) : (
              <span className="block text-md text-gray-400 p-3 rounded cursor-not-allowed">
                My Bookings
              </span>
            )}

            {isLoggedIn && user ? (
              <Link
                to={`/`}
                className="block font-semibold text-md text-gray-900 hover:bg-gray-100 p-3 rounded"
              >
                Book now
              </Link>
            ) : (
              <span className="block text-md text-gray-400 p-3 rounded cursor-not-allowed">
                Book now
              </span>
            )}

            <Link
              to="/about"
              className="block text-md font-medium text-gray-900 hover:bg-gray-100 p-3 rounded"
            >
              About
            </Link>

            {isLoggedIn && user ? (
              <div className="mt-4">
                <Avatar />
              </div>
            ) : (
              <Link
                to="/login"
                className="text-md font-medium text-blue-700 hover:text-blue-800 mt-4 block"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Header;
