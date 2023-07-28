export default function PoweredBy() {
  return (
    <div className="pb-24 sm:py-32 dark:hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-primary">
          Powered by
        </h2>
        <div className="mx-auto mt-10 flex max-w-lg items-center gap-12">
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/205146/logo-light.png"
            alt="Transistor"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/2560px-OpenAI_Logo.svg.png"
            alt="Reform"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://d7umqicpi7263.cloudfront.net/img/product/738798c3-eeca-494a-a2a9-161bee9450b2/e5b756ef-fd93-4792-aa72-bba6c4ebd031.png"
            alt="Tuple"
            width={158}
            height={48}
          />

        </div>
      </div>
    </div>
  )
}
