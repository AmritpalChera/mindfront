import Image from "next/image";
import Link from "next/link";

export default function ProjectsDemo() {
  return (
    <div className="flex justify-center flex-col items-center pb-24">
      <p className="xl:text-9xl md:text-8xl text-6xl font-bold text-primary">Control your data</p>
      {/* <p className=" md:text-6xl text-4xl mt-12 text-gray-600">All your projects in one place</p>
      <div className="w-full max-w-6xl mt-12 p-4 md:p-12 warmYellowGradient rounded-2xl">
        <Image
          src="/images/landingpage/projects.jpg"
          alt="fetch-image"
          height={2048}
          width={2048}
          className="mx-auto w-full h-full"
        />
      </div> */}

      <div className="flex flex-wrap-reverse items-center justify-around md:px-24 mt-24 gap-12">
        <div className=" mt-12 max-w-4xl flex p-4 md:p-12 coolBlueGradient justify-center rounded-2xl">
          <Image
            src="/images/landingpage/projects.jpg"
            alt="fetch-image"
            height={2048}
            width={2048}
            className="mx-auto w-full h-full"
          />
        </div>
        <div className="max-w-3xl">
          <p className="md:leading-snug  md:text-8xl mt-24 max-w-6xl text-4xl text-secondary dark:text-primary font-bold">All your projects in one place</p>
        </div>
        
        
      </div>

      <div className="flex flex-wrap items-center justify-around md:px-24 mt-24 gap-12">
        <div className="max-w-3xl">
          <p className="md:leading-snug  md:text-8xl mt-24 max-w-6xl text-4xl text-secondary dark:text-primary font-bold">Manage what your 🧠 thinks</p>
          <p className="text-gray-600 text-4xl mt-8">Easily update and manage data</p>
        </div>
        <div className=" mt-12 max-w-4xl flex p-4 md:p-12 coolBlueGradient justify-center rounded-2xl">
          <Image
            src="/images/landingpage/vectorsNew.jpg"
            alt="fetch-image"
            height={2048}
            width={2048}
            className="mx-auto w-full h-full"
          />
        </div>
        
      </div>
     
      <Link
        href={'/dashboard'}
        className="rounded-md mt-48 text-center bg-primary py-4 px-8 text-base w-64 md:w-96 font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer"
      >
        Get Started!
      </Link>
    </div>
  )
}