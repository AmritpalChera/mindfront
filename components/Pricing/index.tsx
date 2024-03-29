"use client";
import { selectUser } from "@/redux/features/UserSlice";
import { useSelector } from "react-redux";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";
import Link from "next/link";
import { CustomerPlans } from "@/utils/app/customerplans";

const Pricing = () => {
  const user = useSelector(selectUser);  

  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      
      <div className="container">
        <SectionTitle
          title="Pricing"
          paragraph=""
          center
          width="665px"
        />

        <div className="flex gap-4 flex-wrap justify-center">
          <PricingBox
            packageName="Lite"
            price="0"
            duration="mo"
            subtitle="For small scale projects"
            disabled={user.planType === CustomerPlans.CUSTOM}
            planType="starter"
            id="lite"
          >
            <OfferList text={`${user.configs?.plans?.lite?.projectLimit} project`} status="active" />
            <OfferList text={`${user.configs?.plans?.lite?.vectorLimit} vectors total`} status="active" />
            <OfferList text="Email support" status="active" />
            <OfferList text="Discord channel" status="active" />
            <OfferList text="Test with chatbot" status="active" />
          </PricingBox>
          <PricingBox
            packageName="Basic"
            price={(user.configs?.plans?.basic?.amount/100).toString() || "30"}
            duration={"mo"}
            subtitle="For medium scale projects"
            planType="starter"
            id="basic"
          >
            <OfferList text={`${user.configs?.plans?.basic?.projectLimit} projects`} status="active" />
            <OfferList text={`${user.configs?.plans?.basic?.vectorLimit} vectors total`} status="active" />
            <OfferList text="Email support" status="active" />
            <OfferList text="Discord channel" status="active" />
            <OfferList text="Test with chatbot" status="active" />
          </PricingBox>
          <PricingBox
            packageName="One-time"
            price={(user.configs?.plans?.custom?.amount/100).toString() || "300"}
            duration={""}
            subtitle="Must bring your own keys"
            disabled={false}
            description="Get full control of your data by bringing your own keys!"
            featured={true}
            planType="custom"
            id="custom"
          >
            <OfferList text="Unlimited Projects" status="active" />
            <OfferList text="100,000+ vectors" status="active" />
            <OfferList text="Bring your own keys" status="active" />
            <OfferList text="Email Support" status="active" />
            <OfferList text="Direct founder access" status="active" />
          </PricingBox>
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-12">
        <div className="text-xl text-primary font-bold">Need more?</div>
        <Link target="blank" href="https://twitter.com/AwesomAmri" className="mt-4 underline">Contact Amritpal on Twitter</Link>
      </div>

      <div className="absolute left-0 bottom-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Pricing;
