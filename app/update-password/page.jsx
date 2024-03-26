"use client";

import supabase from "@/utils/supabaseClient";
import Link from "next/link";
import { useState } from "react";

const SigninPage = () => {

  const [confirmedP, setConfirmedP] = useState('');
  const [password, setPassword] = useState('');

  const [checkEmail, setCheckEmail] = useState(false);
  const [error, setError] = useState('');

  const forgotEmail = async () => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:9000/update-password',
    });
    if (error) {
      setError('For security purposes, you can only request this once every 60 seconds');
      return;
    }
  };

  const formSubmitted = async (e) => {
    e.preventDefault();
    setError('');

    const status = await supabase.auth.signInWithPassword({ email, password });
    if (status?.error) {
      setError(status.error.message)
      return;
    }
    setEmail('');
    setPassword('')
    setCheckEmail(true);
  }
  return (
    <>
      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Reset Password
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Type in your new Passowrd
                </p>
              
                <form onSubmit={formSubmitted}>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-secondary dark:text-white"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      disabled={checkEmail}
                      onChange={e=>setPassword(e.target.value)}
                      placeholder="Enter your Password"
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm font-medium text-secondary dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      disabled={checkEmail}
                      value={confirmedP}
                      onChange={e=>setConfirmedP(e.target.value)}
                      placeholder="Confirm Password"
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <button disabled={checkEmail} className="flex w-full items-center justify-center rounded-md bg-primary disabled:bg-dark py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                      {checkEmail? "Login email sent": "Change Password"}
                    </button>
                  </div>
                </form>
                {error && <p className="text-red font-bold text-center my-3">{error}</p>}
                {checkEmail && <p onClick={()=>setCheckEmail(false)} className="text-primary text-center my-3 cursor-pointer">Didn&apos;t get an email? Retry</p>}

                <p className="text-center text-base font-medium text-body-color">
                 
                  <Link href="/signin" className="text-primary hover:underline">
                    Sign in 
                  </Link>
                  
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
