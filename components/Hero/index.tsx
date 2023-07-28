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
                <p className="xl:text-6xl lg:text-5xl text-3xl pb-4 text-primary">Make it smart 🧠</p>
                <h1 className="mb-5 text-6xl xl:text-9xl md:text-8xl font-semibold leading-tight text-secondary dark:text-white sm:leading-tight  md:leading-tight">
                  Virtual Brain Interface
                </h1>
                <p className="mb-12 hidden text-base mt-4 font-medium !leading-relaxed text-secondary dark:text-white dark:opacity-90 sm:text-xl md:text-4xl">
                   <br /> We take text, PDFs, webpages, audio and output searchble text!
                </p>
                <div className="flex flex-col justify-center space-y-4 mt-24 md:md-32 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div
                    onClick={()=>router.push(user.id? '/dashboard': '/signin')}
                    className="rounded-md text-center bg-primary py-4 px-8 text-base w-64 md:w-96 font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer"
                  >
                    Get Started!
                  </div>
                  {/* <Link
                    href="https://github.com/NextJSTemplates/startup-nextjs"
                    className="rounded-md text-center bg-black/20 py-4 px-8 text-base font-semibold text-black duration-300 ease-in-out hover:bg-black/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
                  >
                    Documentation
                  </Link> */}
                </div>
                <div className="w-full flex justify-center gap-4 mt-12 text-2xl">
                  <AiFillFilePdf color="fireBrick" />
                  <RiPagesFill color="gray" />
                  <TbWorld color="royalBlue" />
                </div>
              </div>
              
            </div>
            <div className="flex justify-center w-full lg:w-fit rounded-2xl">
              {/* <img className="rounded-2xl" src="https://image.lexica.art/full_jpg/6305ff28-b610-4f50-966e-8b6a7277e7cb" width={500} height={500} /> */}
              <Image
                src="/images/landingpage/brain1.jpg"
                alt="logo"
                className=" rounded-2xl"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
       
      </section>
    </>
  );
};

export default Hero;
