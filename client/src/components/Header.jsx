import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { LiaTimesSolid } from 'react-icons/lia';
import { BiMenuAltRight } from 'react-icons/bi';
import { useSelector } from 'react-redux';
const Header = () => {
  const [active, setActive] = useState(false);
  const [dropdwon, setDropdwon] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <header className="bg-slate-400  fixed w-full z-50 shadow-md  ">
      <div className="container flex items-center h-16 justify-between gap-2">
        <Link to="/" className="font-semibold text-xl text-gray-700">
          ZoubairEstate
        </Link>
        <form className="p-1 ml-auto  md:ml-0 md:max-w-[400px] md:w-full bg-slate-200 md:px-3 md:py-0 rounded-md flex  items-center ">
          <input
            type="text"
            placeholder="Search..."
            className="hidden md:block md:w-full md:p-3 bg-transparent text-base focus:outline-none"
          />
          <FaSearch size={20} color="gray" className="bg-transparent" />
        </form>
        {active ? (
          <LiaTimesSolid
            size={30}
            className="block md:hidden order-1"
            onClick={() => setActive(false)}
          />
        ) : (
          <BiMenuAltRight
            size={30}
            className="block md:hidden order-1"
            onClick={() => setActive(true)}
          />
        )}
        <div className="flex items-center gap-5">
          <nav
            className={`absolute pb-2 md:ml-auto md:pb-0 bg-slate-400 w-full   left-0 md:w-fit md:opacity-100 top-full transition-all duration-300 md:static ${
              active ? ' opacity-100 ' : 'opacity-0'
            } `}
          >
            <ul className="md:flex md:items-center gap-4">
              <li className="hover:bg-slate-200">
                <Link
                  to="/"
                  className="py-2 px-1 block capitalize text-base font-semibold  transition-all duration-300"
                >
                  home
                </Link>
              </li>
              <li className="hover:bg-slate-200">
                <Link
                  to="/about"
                  className="py-2 px-1 block capitalize text-base font-semibold  transition-all duration-300"
                >
                  about
                </Link>
              </li>
            </ul>
          </nav>
          <ul>
            {currentUser ? (
              <li className="relative " onClick={() => setDropdwon(!dropdwon)}>
                <img
                  src={currentUser.userPhoto}
                  alt=""
                  className="w-10 h-10 my-3 rounded-full object-cover"
                />
                {dropdwon && (
                  <ul className="absolute  shadow-md to-full min-w-[150px] w-fill px-2 right-0  bg-slate-300 ">
                    <li>
                      <p className="py-2 text-sm">
                        @{currentUser.username?.slice(0, 15)}...
                      </p>
                    </li>
                    <li>
                      <Link to="/profile" className="py-2 text-sm">
                        Profile
                      </Link>
                    </li>
                    <li className="py-2 text-sm">Sign out</li>
                  </ul>
                )}
              </li>
            ) : (
              <li className="hover:bg-slate-200">
                <Link
                  to="sign-in"
                  className="py-2 px-1 block capitalize text-base font-semibold  transition-all duration-300"
                >
                  singIn
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
