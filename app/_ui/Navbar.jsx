"use client";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../_context/AuthContext";
import GuestDropdown from "./GuestDropdown/GuestDropdown";

function Navbar({ signOutAction }) {
  const [hideMenu, setHideMenu] = useState(true);
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <header>
      <div className="container header-items">
        <h2>LOGO</h2>
        <nav className={`navbar ${hideMenu ? "hide-menu" : "show-menu"}`}>
          <ul>
            <li>
              <Link
                className={pathname === "/" ? "active" : ""}
                href="/"
                onClick={() => setHideMenu(true)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={pathname.includes("rooms") ? "active" : ""}
                href="/rooms"
                onClick={() => setHideMenu(true)}
              >
                Rooms
              </Link>
            </li>
            {/* <li>About</li> */}
            <li>
              <Link
                href={"/contact"}
                className={pathname === "/contact" ? "active" : ""}
                onClick={() => setHideMenu(true)}
              >
                Contact Us
              </Link>
            </li>
            <li>
              {user ? (
                <GuestDropdown user={user} signOutAction={signOutAction} />
              ) : (
                <Link
                  className={
                    pathname.includes("account") || pathname === "/signin"
                      ? "active"
                      : ""
                  }
                  href="/signin"
                  onClick={() => setHideMenu(true)}
                >
                  Guest Area
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <button
          onClick={() => setHideMenu(!hideMenu)}
          className="toggle-menu-button"
        >
          <FontAwesomeIcon icon={hideMenu ? faBars : faClose} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
