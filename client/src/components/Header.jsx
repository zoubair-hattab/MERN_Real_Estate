import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { BiMenuAltRight } from 'react-icons/bi';
const Header = () => {
  const [active, setActive] = useState(false);
  return (
    <header className="bg-slate-400  fixed w-full z-50 shadow-md  border-b border-black">
      <div className="container flex items-center h-16 justify-between gap-4">
        <Link to="/" className="font-semibold text-xl text-gray-700">
          ZoubairEstate
        </Link>
        <form className="p-1 ml-auto md:m-0 md:max-w-[400px] md:w-full bg-slate-200 md:px-3 md:py-0 rounded-md flex  items-center ">
          <input
            type="text"
            placeholder="Search..."
            className="hidden md:block md:w-full md:p-3 bg-transparent text-base focus:outline-none"
          />
          <FaSearch size={20} color="gray" className="bg-transparent" />
        </form>
        <BiMenuAltRight
          size={35}
          className="block md:hidden"
          onClick={() => setActive(true)}
        />
        <nav
          className={`absolute pb-2 md:pb-0 bg-slate-400 w-full top-full md:w-fit  transition-all duration-300 md:static ${
            active ? 'left-0 ' : '-left-[600px]'
          } `}
        >
          <ul className="md:flex md:items-center gap-4">
            <li className="hover:bg-slate-200">
              <Link
                to="/home"
                className="py-2 px-3 block capitalize text-base font-semibold  transition-all duration-300"
              >
                home
              </Link>
            </li>
            <li className="hover:bg-slate-200">
              <Link
                to="/about"
                className="py-2 px-3 block text-base font-semibold  transition-all duration-300"
              >
                about
              </Link>
            </li>
            <li className="hover:bg-slate-200">
              <Link
                to="sign-in"
                className=" py-2 px-3 block text-base font-semibold  transition-all duration-300"
              >
                singIn
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
