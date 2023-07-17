import Image from "next/image";

export default function Logo() {
  return (
    <>
      <Image
        src="/images/logo/logo-2.svg"
        alt="logo"
        width={140}
        height={30}
        className="dark:hidden"
      />
      <Image
        src="/images/logo/logo.svg"
        alt="logo"
        width={140}
        height={30}
        className="hidden dark:block"
      />
    </>
  )
}