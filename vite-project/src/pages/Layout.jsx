import { Outlet, NavLink } from "react-router-dom";
import { UserButton, SignInButton, useUser } from "@clerk/clerk-react";
import React from "react";

const Layout = () => {
  const { isSignedIn } = useUser();

  return (
    <>
      <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
        <h1 className="text-orange-600 text-bold text-2xl">CustomIzeD AIs</h1>
        <div className="flex items-center gap-8">
          <ul className="flex gap-8">
            <li>
              <NavLink className={({ isActive }) => (isActive ? "text-orange-600 font-bold" : "hover:text-orange-600")} to="/">Home</NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? "text-orange-600 font-bold" : "hover:text-orange-600")} to="/my-ais">My AIs</NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? "text-orange-600 font-bold" : "hover:text-orange-600")} to="/generator" >Image Gen </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? "text-orange-600 font-bold" : "hover:text-orange-600")} to="/contact">Contact</NavLink>
            </li>
          </ul>
          <div className="flex items-center">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 rounded-md">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </nav>

      <div className="mx-4">
        {isSignedIn ? <Outlet /> : (
          <div className="min-h-[80vh] flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
              <p className="mb-4">You need to be signed in to access this content</p>
              <SignInButton mode="modal">
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 rounded-md">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;