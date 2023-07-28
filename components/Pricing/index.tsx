"use client";
import { selectUser } from "@/redux/features/UserSlice";
import supabase from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";
import Navbar from "../Navbar";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [subscription, setSubscription] = useState(false);

  const user = useSelector(selectUser);
  const getSubscription = async () => {
    if (!user.id) return;

    const {data} = await supabase.from('customers').select().eq('_id', user.id).single();
    if (!data || !data.active) return;
    setSubscription(true)
  }

  useEffect(() => { 
    getSubscription();
  }, [user.email])

  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      
      <div className="container">
        <SectionTitle
          title="Pricing"
          paragraph=""
          center
          width="665px"
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          <PricingBox
            packageName="Lite"
            price={isMonthly ? "0" : "0"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="For small scale projects"
            subscribed={subscription}
          >
            <OfferList text="1 project" status="active" />
            <OfferList text="300 vectors total" status="active" />
            <OfferList text="Email support" status="active" />
            <OfferList text="Discord channel" status="active" />
            <OfferList text="Test with chatbot" status="inactive" />
          </PricingBox>
          <PricingBox
            packageName="Basic"
            price={isMonthly ? "20" : "150"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="For medium scale projects"
            subscribed={subscription}
            
          >
            <OfferList text="10 projects" status="active" />
            <OfferList text="10000 vectors total" status="active" />
            <OfferList text="Email support" status="active" />
            <OfferList text="Discord channel" status="active" />
            <OfferList text="Test with chatbot" status="active" />
          </PricingBox>
          <PricingBox
            packageName="Custom"
            price={isMonthly ? "10" : "700"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="Requires $70 one-time fee"
            disabled={false}
            subscribed={subscription}
            description="Get full control of your data by bringing your own keys!"
            featured={true}
          >
            <OfferList text="Unlimited Projects" status="active" />
            <OfferList text="100,000+ vectors" status="active" />
            <OfferList text="Commercial Use" status="active" />
            <OfferList text="Bring your own keys" status="active" />
            <OfferList text="Email Support" status="active" />
            <OfferList text="Discord Channel" status="active" />
          </PricingBox>
        </div>
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
