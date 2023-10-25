import Image from "next/image";
import Link from "next/link";

export default function ProjectsDemo() {
  return (
    <div className="flex justify-center flex-col items-center pb-24">

      <div className="flex flex-col items-center justify-around w-full max-w-8xl  mt-24 gap-12">
        <div className="text-center">
          <p className="md:leading-snug  md:text-8xl max-w-6xl text-4xl text-secondary dark:text-primary font-bold md:whitespace-nowrap">Organized Databases</p>
          {/* <p className="text-gray-600 text-4xl mt-8">Parse through different collections and dbs</p> */}
        </div>
        <div className="flex flex-wrap md:flex-nowrap items-center justify-evenly w-full gap-4 p-4">
          <div className=" mt-12 flex shadow-xl border shadow-gray-400 p-1 justify-center rounded-lg">
          <Image
            src="/images/landingpage/projects.jpg"
            alt="fetch-image"
            height={2048}
            width={2048}
            className="mx-auto w-full h-full max-w-2xl"
          />
        
          </div>
          <div className="text-3xl whitespace-pre-wrap max-w-lg">
            <h1 className="md:text-start text-center"><span className="text-4xl font-bold text-primary">Save time managing data with our built-in dashboard</span><br/><br/>Monitor usage and key metrics</h1>
          </div>
        </div>

        <div className="flex flex-wrap-reverse md:flex-nowrap items-center justify-evenly w-full gap-4 p-4">
          <div className="text-3xl whitespace-pre-wrap">
              <h1 className="md:text-start text-center max-w-lg"><span className="text-4xl font-bold text-primary ">Scroll DB collections with ease</span><br/><br/>Easily view and delete collections</h1>
            </div>
          <div className=" mt-12 max-w-3xl flex shadow-xl shadow-gray-400 border p-1  justify-center rounded-lg">
            <Image
              src="/images/landingpage/collections.png"
              alt="fetch-image"
              height={2048}
              width={2048}
              className="mx-auto w-full h-full max-w-4xl"
            />
        
          </div>
          
        </div>
        
        <div className="flex flex-wrap md:flex-nowrap items-center w-full justify-evenly gap-4 p-4">
          <div className=" mt-12 max-w-3xl flex shadow-xl shadow-gray-400 border p-1 justify-center rounded-lg">
          <Image
            src="/images/landingpage/vectors.png"
            alt="fetch-image"
            height={2048}
            width={2048}
            className="mx-auto w-full h-full max-w-4xl"
          />
        
          </div>
          <div className="text-3xl whitespace-pre-wrap">
            <h1 className="md:text-start text-center max-w-lg"><span className="text-4xl font-bold text-primary ">Search through collection vectors using the search bar.</span><br/><br/>Update data and delete vectors.</h1>
          </div>
        </div>
        
        
      </div>

      <div className="flex flex-wrap items-center justify-around md:px-24 mt-24 gap-12">
        <div className="text-center">
          <p className="md:leading-snug  md:text-8xl mt-24 max-w-6xl text-4xl text-secondary dark:text-primary font-bold">Quality Assurance</p>
          <p className="text-gray-600 md:text-4xl text-xl mt-8">Manage what your AI knows</p>
        </div>
        <div className="flex flex-wrap md:flex-nowrap items-center justify-evenly w-full gap-4 p-4">
          <div className=" mt-12 max-w-3xl flex shadow-xl shadow-gray-400 border p-1 justify-center rounded-lg">
          <Image
            src="/images/landingpage/vectorsNew.jpg"
            alt="fetch-image"
            height={2048}
            width={2048}
            className="mx-auto w-full h-full max-w-3xl"
          />
        
          </div>
          <div className="text-3xl whitespace-pre-wrap max-w-xl">
            <h1 className="md:text-start text-center">
              <span className="text-4xl font-bold text-primary max-w-lg">Test AI responses from uploaded data</span><br /><br />Test response quality instantly
            </h1>
          </div>
        </div>
        
      </div>

      <div className="flex flex-col items-center justify-around md:px-24 mt-24 gap-12">
       
        <div className="text-center">
          <p className="md:leading-snug  md:text-8xl mt-24 max-w-6xl text-4xl text-secondary dark:text-primary font-bold">Multiple formats</p>
          <p className="text-gray-600 text-4xl mt-8">PDFs | Text | Audio | URLs</p>
        </div>
        
        <div className="flex flex-wrap-reverse md:flex-nowrap items-center justify-evenly w-full gap-4 p-4">
          <div className="text-3xl whitespace-pre-wrap">
              <h1 className="md:text-start text-center max-w-lg"><span className="text-4xl font-bold text-primary">Upload any content</span><br/><br/>Store content from different sources without hassle</h1>
            </div>
          <div className=" mt-12 max-w-3xl flex shadow-xl shadow-gray-400 border p-1  justify-center rounded-lg">
            <Image
              src="/images/landingpage/formats.jpg"
              alt="fetch-image"
              height={2048}
              width={2048}
              className="mx-auto w-full h-full max-w-3xl"
            />
        
          </div>
          
        </div>
        
      </div>

      <div className="flex flex-col items-center justify-around w-full md:px-24 mt-24 gap-12">
        <div className="text-center">
          <p className="md:leading-snug  md:text-8xl max-w-6xl text-4xl text-secondary dark:text-primary font-bold whitespace-nowrap">Smart Queries</p>
          {/* <p className="text-gray-600 text-4xl mt-8">Parse through different collections and dbs</p> */}
        </div>
        <div className="flex flex-wrap md:flex-nowrap items-center justify-evenly w-full gap-4 p-4">
          <div className=" mt-12 max-w-3xl flex  justify-center rounded-lg">
          <Image
            src="/images/landingpage/smartSearch.png"
            alt="fetch-image"
            height={2048}
            width={2048}
            className="mx-auto w-full max-h-[500px] max-w-4xl"
          />
        
          </div>
          <div className="text-3xl whitespace-pre-wrap max-w-lg">
            <h1 className="md:text-start text-center"><span className="text-4xl font-bold text-primary">Search the web</span><br/><br/>Get info from select links for your search queries</h1>
          </div>
        </div>

        <div className="flex flex-wrap-reverse md:flex-nowrap items-center justify-evenly w-full gap-4 p-4">
          <div className="text-3xl whitespace-pre-wrap max-w-lg">
              <h1 className="md:text-start text-center"><span className="text-4xl font-bold text-primary">Extract text from webpages</span><br/><br/>Crawl text on webpages for custom operations</h1>
            </div>
          <div className=" mt-12 max-w-3xl flex justify-center rounded-lg">
            <Image
              src="/images/landingpage/textExtraction.png"
              alt="fetch-image"
              height={2048}
              width={2048}
              className="mx-auto w-full max-h-[500px] max-w-4xl rounded-2xl"
            />
        
          </div>
          
        </div>
        
        
        
      </div>
     
      <Link
        href={'/dashboard'}
        target="blank"
        className="rounded-md mt-48 text-center bg-primary py-4 px-8 text-base w-64 md:w-96 font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer"
      >
        Get started
      </Link>
      <div className="text-primary mt-4">
        Try today for free
      </div>
    </div>
  )
}