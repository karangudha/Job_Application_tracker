import React from "react";
import { link } from "react-router-dom"



const Navbar = ({ toggleDrawer }) => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const { data } = await logout();
            dispatch(setAuth(data));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <nav className="fixed z-50 flex w-full flex-wrap items-center justify-between bg-black-700 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
                <div className="flex w-full flex-wrap items-center jsutify-between px-16">
                    <Link to="/dashboard"> </Link>
                    <div className="flex w-[30%] items-center sm:justify-betwwen justify-end">
                        <div className="hidden sm:flex items-center w-full">
                            <Search />
                        </div>
                        <span className="flex sm:hidden items-center whitespace-nowrap">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-6 h-6 text-white-300 hover:text-gray-300 cursor:pointer"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                onClick={toggleDrawer}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </span>
                        <span
                            className="input-group-text hidden sm:flex items-center whitespace-nowrap"
                            id="basic-addon2"
                            onClick={handleLogout}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 text-white-300 hover:text-gray-300 cursor:pointer"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;