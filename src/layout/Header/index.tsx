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
import {
  FiMenu,
  FiPlus,
  FiEdit,
  FiChevronDown,
  FiPhone,
  FiList,
} from "react-icons/fi";
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
  {
    name: "My Venues",
    description: "Manage your venues - edit/delete",
    href: "/profiles",
    icon: FiEdit,
  },
];

const callsToAction = [
  {
    name: "Customer Support",
    href: "/support",
    icon: FiPhone,
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
            className="-m-2.5 inline-flex items-center justify-center rounded p-2.5 text-gray-700"
          >
            <FiMenu className="h-6 w-6" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {/* Popover for Venues */}
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-secondary focus:text-secondary">
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
                    className="group relative flex items-center gap-x-6 rounded p-4 text-sm leading-6 hover:bg-gray-50 active:bg-secondary active:text-white"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded bg-gray-50 group-hover:bg-white">
                      <item.icon className="h-6 w-6 text-gray-600 group-hover:text-secondary" />
                    </div>
                    <div className="flex-auto">
                      <span className="block font-semibold text-gray-900">
                        {item.name}
                      </span>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 active:bg-secondary active:text-white"
                  >
                    <item.icon className="h-5 w-5 flex-none text-gray-400" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          {/* My Bookings Link */}
          {isLoggedIn && user ? (
            <Link
              to={`/profiles/${user.name}/bookings`} // Dynamically populate the name here
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary focus:text-secondary active:text-white"
            >
              My Bookings
            </Link>
          ) : (
            <span className="text-sm text-gray-900">My Bookings</span>
          )}

          {/* Other Links */}
          <Link
            to="#"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary focus:text-secondary active:text-white"
          >
            Contact
          </Link>

          <Link
            to="/about"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary focus:text-secondary active:text-white"
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

      {/* Mobile Menu Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <DialogPanel
          ref={menuRef}
          className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
          <div className="flex flex-col space-y-8 pl-2">
            <Disclosure as="div">
              <div className="flex flex-row lg:flex-1 gap-1 cursor-pointer mb-8">
                <Link to="/" className="flex items-center">
                  <IoSunnyOutline className="text-yellow-700 h-8 w-8" />
                  <span className="text-2xl text-blue-800 font-bold">
                    holidaze
                  </span>
                </Link>
              </div>
              <DisclosureButton className="mt-6 group flex w-full items-center justify-between text-md hover:bg-gray-50">
                Venues
                <FiChevronDown className="h-5 w-5 group-data-[open]:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="space-y-4 mt-6 pl-4">
                {products.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className="block text-md hover:bg-gray-50 active:bg-secondary active:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </DisclosurePanel>
            </Disclosure>
            {/* Mobile: My Bookings Link */}
            {isLoggedIn && user ? (
              <Link
                to={`/profiles/${user.name}/bookings`} // Dynamically populate the name here
                className="-mx-3 text-md hover:bg-gray-50 active:bg-secondary active:text-white"
              >
                My Bookings
              </Link>
            ) : (
              <span className="-mx-3 text-md text-gray-900">My Bookings</span>
            )}
            {callsToAction.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="-mx-3 text-md hover:bg-gray-50 active:bg-secondary active:text-white"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="py-6 flex justify-end">
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
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Header;
