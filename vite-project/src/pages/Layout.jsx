import { Outlet, NavLink } from "react-router-dom";
import { UserButton, SignInButton, useUser } from "@clerk/clerk-react";
import { HelmetProvider } from 'react-helmet-async';
import React from "react";

const Layout = () => {
  const { isSignedIn } = useUser();

  return (
    <HelmetProvider>
      <nav className="bg-gray-700 p-4 text-white flex justify-between items-center">
        <h1 className="text-blue-600 font-bold text-2xl hover:font-extrabold hover:cursor-pointer">CustomIzeD AIs</h1>
        <div className="flex items-center gap-8">
          <ul className="flex gap-8">
            <li>
              <NavLink className={({ isActive }) => (isActive ? "text-blue-600 font-bold" : "hover:text-blue-600")} to="/">Home</NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? "text-blue-600 font-bold" : "hover:text-blue-600")} to="/my-ais">My AIs</NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? "text-blue-600 font-bold" : "hover:text-blue-600")} to="/generator" >Image Gen </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? "text-blue-600 font-bold" : "hover:text-blue-600")} to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? "text-blue-600 font-bold" : "hover:text-blue-600")} to="/contact">Contact</NavLink>
            </li>
          </ul>
          <div className="flex items-center">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md">
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
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
};

export default Layout;