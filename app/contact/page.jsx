import Contact from "@/components/Contact";
import NewsLatterBox from "@/components/Contact/NewsLatterBox";
import Link from "next/link";

const Profile = () => {
  return (
    <>
      <section className="overflow-hidden pt-[180px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap-reverse">
            
            <div className="w-full px-4 lg:w-4/12">
            
              <div className="mb-10 rounded-md bg-primary bg-opacity-5 dark:bg-opacity-10">
                <h3 className="border-b border-body-color border-opacity-10 py-4 px-8 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  Pages
                </h3>
                <ul className="py-6 px-8">
                  <li>
                    <Link
                      href="/dashboard"
                      className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://info-153.gitbook.io/mindplug/"
                      target={"_blank"}
                      className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              

              <NewsLatterBox />
            </div>

            <div className="w-full px-4 lg:w-8/12">
              <div>
                  <Contact />
                  
                  <div className="items-center justify-between sm:flex">
                    <div className="mb-5">
                      
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  );
};

export default Profile;
