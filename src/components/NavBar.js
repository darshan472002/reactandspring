import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink as ReactLink } from 'react-router-dom'
const navigation = [
  { name: 'Home', to: '/', current: true },
  { name: 'About', to: '/about', current: false },
  { name: 'Login', to: '/login', current: false },
  { name: 'SignUp', to: '/signup', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <h1 className="text-2xl text-white">
                <ReactLink to='/'>ReactController</ReactLink>
              </h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navigation.map((item) => (
                <ReactLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    classNames(
                      isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                >
                  {item.name}
                </ReactLink>
              ))}
            </div>
          </div>
          {/* Search bar positioned on the right side */}
          {/* <div className="hidden sm:block sm:ml-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                className="bg-gray-700 text-gray-300 rounded-md pl-10 pr-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:bg-gray-800"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div> */}
        </div>
      </div>

      {/* Display Search Results */}
      {/* {searchResults.length > 0 && (
        <div className="absolute top-16 w-full bg-gray-700 text-white p-4 z-40">
          <h2 className="text-lg font-semibold">Search Results:</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id} className="py-1">
                {result.userName} - {result.email}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={ReactLink}
              to={item.to}
              className={({ isActive }) =>
                classNames(
                  isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
            >
              {item.name}
            </DisclosureButton>
          ))}
          {/* Mobile Search bar */}
          {/* <div className="relative mt-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              className="w-full bg-gray-700 text-gray-300 rounded-md pl-10 pr-3 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:bg-gray-800"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div> */}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
