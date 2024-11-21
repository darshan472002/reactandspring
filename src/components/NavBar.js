import { Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { NavLink as ReactLink, useNavigate } from 'react-router-dom'
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth'
import { useState, useEffect } from 'react'

const navigation = [
  { name: 'Home', to: '/', current: true },
  { name: 'About', to: '/about', current: false },
]

const authNavigation = [
  { name: 'Login', to: '/login', current: false },
  { name: 'SignUp', to: '/signup', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  const navigate = useNavigate()
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    setLogin(isLoggedIn())
    setUser(getCurrentUserDetail())
  }, [login])

  const logout = () => {
    doLogout(() => {
      setLogin(false)
      navigate('/login')
    })
  }

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </Disclosure.Button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <h1 className="text-2xl text-white">
                <ReactLink to="/">ReactController</ReactLink>
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

          {/* Right-aligned Login/SignUp or Profile Dropdown */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {login ? (
              <Menu as="div" className="relative">
              <Menu.Button className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-1 py-2 text-sm font-medium">
                {/* <img
                  src={user?.image || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="h-8 w-8 rounded-full mr-2"
                /> */}
                Profile Info
                <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-gray-700 text-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <span
                        className={classNames(
                          active ? 'bg-gray-500 text-white' : 'text-white',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        {`Hello, ${user?.email}`}
                      </span>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={classNames(
                          active ? 'bg-gray-500 text-white' : 'text-white',
                          'block w-full text-left px-4 py-2 text-sm'
                        )}
                      >
                        LogOut
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
            ) : (
              authNavigation.map((item) => (
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
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Disclosure.Button
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
            </Disclosure.Button>
          ))}
          {/* Mobile Login/SignUp or Profile Dropdown */}
          {login ? (
            <Disclosure.Button
              as="div"
              className="space-y-1 px-2 py-1 text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-md text-sm font-medium"
            >
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-1 py-2 text-sm font-medium">
                  {/* <img
                    src={user?.image || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="h-8 w-8 rounded-full mr-2"
                  /> */}
                  Profile Info
                  <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
                <Menu.Items className="absolute left-0 mt-2 w-48 bg-gray-700 text-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <span
                          className={classNames(
                            active ? 'bg-gray-500 text-white' : 'text-white',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          {`Hello, ${user?.email}`}
                        </span>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={classNames(
                            active ? 'bg-gray-500 text-white' : 'text-white',
                            'block w-full text-left px-4 py-2 text-sm'
                          )}
                        >
                          LogOut
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            </Disclosure.Button>
          ) : (
            authNavigation.map((item) => (
              <Disclosure.Button
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
              </Disclosure.Button>
            ))
          )}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  )
}
