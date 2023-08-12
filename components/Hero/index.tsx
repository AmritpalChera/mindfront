"use client";
import { selectUser } from "@/redux/features/UserSlice";
import { RiPagesFill } from 'react-icons/ri';
import { TbWorld } from 'react-icons/tb';
import { AiFillFilePdf } from 'react-icons/ai';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";

const Hero = () => {
  const router = useRouter();
  const user = useSelector(selectUser);

  return (
    <>
      <section
        className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center justify-between">
            <div className="px-4 flex-1 flex flex-col justify-center">
              <div
                className="wow fadeInUp mx-auto pb-12 pt-20"
                data-wow-delay=".2s"
              >
                <p className="lg:text-5xl text-3xl pb-4 text-primary">Make it smart</p>
                <h1 className="mb-5 text-5xl md:text-7xl xl:text-8xl font-semibold leading-tight text-secondary dark:text-white sm:leading-tight  md:leading-tight">
                  Embeddings in 4 lines
                </h1>
                <p className="mb-12 hidden text-base mt-4 font-medium !leading-relaxed text-secondary dark:text-white dark:opacity-90 sm:text-xl md:text-4xl">
                   <br /> We take text, PDFs, webpages, audio and output searchble text!
                </p>
                <div className="flex flex-col space-y-4 mt-24 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href={'https://calendly.com/cheraamritpal/30min'}
                    target="blank"
                    className="rounded-md text-center bg-primary py-4 px-8 text-base  font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer"
                  >
                    Get Early Access
                  </Link>
                  <Link
                    target="blank"
                    href="https://docs.mindplug.io/javascript-sdk"
                    className="rounded-md text-center bg-black/20 py-4 px-8 text-base font-semibold text-black duration-300 ease-in-out hover:bg-black/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
                  >
                    Documentation
                  </Link>
                </div>
                
              </div>
              
            </div>
            {/* <div className="flex justify-center w-full lg:w-fit rounded-2xl">
              <Image
                src="/images/landingpage/brain1.jpg"
                alt="logo"
                className=" rounded-2xl"
                width={500}
                height={500}
              />
            </div> */}
          </div>
        </div>
       
      </section>
    </>
  );
};

export default Hero;
