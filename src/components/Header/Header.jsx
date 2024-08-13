import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-gray-300 border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-black-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        type="button"
                        onClick={toggleMobileMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>

                    <div
                        className={`lg:flex lg:w-auto lg:order-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to='/'
                                    className={({ isActive }) =>
                                        `${isActive ? "text-orange-700" : "text-gray-700"} block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/expenditure'
                                    className={({ isActive }) =>
                                        `${isActive ? "text-orange-700" : "text-gray-700"} block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Expenditure
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/donations'
                                    className={({ isActive }) =>
                                        `${isActive ? "text-orange-700" : "text-gray-700"} block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Donations
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;