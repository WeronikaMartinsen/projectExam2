import "../../styles/index.css";
import { useState } from "react";
import Avatar from "../../components/Profile/Avatar";
import { isLoggedIn } from "../../service/Utils/userUtils";
import {
  Dialog,
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
  FiShield,
  FiLayers,
  FiRepeat,
  FiChevronDown,
  FiPhone,
  FiPlayCircle,
} from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import AuthModal from "../../components/Modals/AuthModal";

const products = [
  {
    name: "Add Venue",
    description: "Create your own venue and publish it!",
    href: "/venues",
    icon: FiPlus,
  },
  {
    name: "Update Venue",
    description: "Speak directly to your customers",
    href: "#",
    icon: FiEdit,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FiShield,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: FiLayers,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: FiRepeat,
  },
];

const callsToAction = [
  { name: "Watch demo", href: "#", icon: FiPlayCircle },
  { name: "Contact sales", href: "#", icon: FiPhone },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setOpen(true);
    setMobileMenuOpen(false); // Close mobile menu when opening modal
  };

  const handleCloseLoginModal = () => {
    setOpen(false);
  };

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
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <FiMenu className="h-6 w-6" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Venues
              <FiChevronDown
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400"
              />
            </PopoverButton>
            <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition">
              <div className="p-4">
                {products.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
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
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon className="h-5 w-5 flex-none text-gray-400" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900 hover:g-100"
          >
            Filters
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Contact
          </a>
         <Link className="text-sm font-semibold leading-6 text-gray-900" to="/about">About</Link>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn() ? (
            <Avatar />
          ) : (
            <button
              onClick={handleOpenLoginModal}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10 bg-black opacity-30" />
        <div className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <Link to="/" className="flex items-center mb-6">
            <IoSunnyOutline className="text-accent h-8 w-8" />
            <span className="text-2xl text-secondary font-bold">holidaze</span>
          </Link>
          <div className="space-y-2">
            <Disclosure as="div">
              <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                Venues
                <FiChevronDown className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="mt-2 space-y-2">
                {products.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </DisclosurePanel>
            </Disclosure>
            {callsToAction.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="py-6 flex justify-end">
            {isLoggedIn() ? (
              <Avatar />
            ) : (
              <button
                onClick={handleOpenLoginModal}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </button>
            )}
          </div>
        </div>
      </Dialog>

      <AuthModal open={open} handleOpen={handleCloseLoginModal} />
    </header>
  );
}

export default Header;
