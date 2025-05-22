import React, { useState } from "react";
import { RiCloseLine, RiMenu2Line } from "@remixicon/react";
const Navbar = () => {
  const [menu, openMenu] = useState(false);
  const [showMenu, setShowmenu] = useState(true);
  return (
    <nav className="flex flex-wrap justify-between md:items-center text-black  px-10 pt-6 md:px-20 ">
     <a href="/"> 
      <span className="text-xl font-bold tracking-wide">Zola Modeling school</span>
      </a> 

      <ul
        className={`${
          menu ? "block" : "hidden"
        }     mx-24 p-y2  font-semibold md:mt-5 bg-black px-16 rounded-xl bg-opacity-30 md:border-none text-center md:bg-transparent md:static md:mx-0 md:flex gap-6 -mt-2`}
      >
        <a href="#about">
          <li className="text-md transition-all duration-300 p-1 md:p-0">
            About
          </li>
        </a>
        <a href="#programs">
          <li className="text-md transition-all duration-300 p-1 md:p-0">
            programs
          </li>
        </a>
        <a>
          <li className="text-md transition-all duration-300 p-1 md:p-0">
            Testimonials
          </li>
        </a>
        <a href="#contact">
          <li className="text-md transition-all duration-300 p-1 md:p-0">
            Contact
          </li>
        </a>
      </ul>
      {showMenu ? (
        <RiMenu2Line
          size={30}
          className="md:hidden absolute right-10 top-6 transition-all duration-300"
          onClick={() => {
            openMenu(!menu);
            setShowmenu(!showMenu);
          }}
        />
      ) : (
        <RiCloseLine
          size={30}
          className="md:hidden absolute right-10 top-6 transition-all duration-300"
        />
      )}
    </nav>
  );
};

export default Navbar;
