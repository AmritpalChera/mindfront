"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser, setUserData } from "@/redux/features/UserSlice";
import supabase from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);

    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const router = useRouter();

  const userSession1 = async () => {
    const session = await supabase.auth.getSession();
    const user = session?.data?.session?.user;
    dispatch(setUserData({ ...user, loaded: true }));
  }

  useEffect(() => {
    userSession1();
  }, [supabase, router])

  
  const signout = async () => {
    dispatch(logout());
    await supabase.auth.signOut();
  }

  return (
    <>
      <header
        className={`header top-0 left-0 z-40 flex w-full items-center bg-transparent ${
          sticky
            ? "!fixed !z-[9998] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20"
            : "absolute"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <Image
                  src="/images/logo/logo-2.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="w-full dark:hidden"
                />
                <Image
                  src="/images/logo/logo.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="hidden w-full dark:block"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={menuItem.id} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            target={menuItem.newTab? '_blank' : '_self'}
                            className={`flex py-2 text-base text-secondary group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <a
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-2 text-base text-secondary group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="15" height="14" viewBox="0 0 15 14">
                                  <path
                                    d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </a>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
              <div
                    onClick={()=>window.open('https://twitter.com/exper_labs', 'blank')}
                    aria-label="social-link"
                    className="mr-6 text-primary hover:text-primary cursor-pointer"
                  >
                    <svg
                      width="26"
                      height="20"
                      viewBox="0 0 19 14"
                      className="fill-current"
                    >
                      <path d="M16.3024 2.26027L17.375 1.0274C17.6855 0.693493 17.7702 0.436644 17.7984 0.308219C16.9516 0.770548 16.1613 0.924658 15.6532 0.924658H15.4556L15.3427 0.821918C14.6653 0.282534 13.8185 0 12.9153 0C10.9395 0 9.3871 1.48973 9.3871 3.21062C9.3871 3.31336 9.3871 3.46747 9.41532 3.57021L9.5 4.0839L8.90726 4.05822C5.29435 3.95548 2.33065 1.13014 1.85081 0.642123C1.06048 1.92637 1.5121 3.15925 1.99194 3.92979L2.95161 5.36815L1.42742 4.5976C1.45565 5.67637 1.90726 6.52397 2.78226 7.14041L3.54435 7.65411L2.78226 7.93665C3.2621 9.24658 4.33468 9.78596 5.125 9.99144L6.16935 10.2483L5.18145 10.8647C3.60081 11.8921 1.625 11.8151 0.75 11.738C2.52823 12.8682 4.64516 13.125 6.1129 13.125C7.21371 13.125 8.03226 13.0223 8.22984 12.9452C16.1331 11.25 16.5 4.82877 16.5 3.54452V3.36473L16.6694 3.26199C17.629 2.44007 18.0242 2.00342 18.25 1.74658C18.1653 1.77226 18.0524 1.82363 17.9395 1.84932L16.3024 2.26027Z" />
                    </svg>
                  </div>
                  {/* <div
                    onClick={()=>window.open('https://discord.gg/ZXGZGnSvrw', 'blank')}
                    aria-label="social-link"
                    className="mr-6 text-primary hover:text-primary cursor-pointer"
                  >
                    <svg
                      width="18"
                      height="14"
                      viewBox="0 0 18 14"
                      className="fill-current"
                    >
                      <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                    </svg>
                </div> */}
                {!user?.id && <div className="flex">
                  <Link
                    href="/signin"
                    className="hidden py-3 px-7 text-base font-bold text-secondary hover:opacity-70 dark:text-white md:block"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
                  >
                    Sign Up
                  </Link>
                </div>}
                

                {user?.id && <button
                  onClick={signout}
                  className="ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
                >
                  Sign Out
                </button>}
                <div>
                  {/* <ThemeToggler /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
