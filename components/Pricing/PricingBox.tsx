"use client";
import { selectUser } from "@/redux/features/UserSlice";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PricingBox = (props: any) => {
  const { price, duration, packageName, subtitle, disabled, children, subscribed, featured } = props;

  const user = useSelector(selectUser);
  const router = useRouter();
  const handleButtonClick = () => {
    if (!user.email) return router.push('/signin');
    else if (price === '0' && !subscribed) return toast('Already on lite plan');
    else if (subscribed) {
      window.open(`https://billing.stripe.com/p/login/00g8yIgpi7XX9fGdQQ?prefilled_email=${user.email}`, "_blank");
    } else if (price === '15') {
      // basic monthly plan
      window.open(`https://buy.stripe.com/6oE4iDdkk0eW2WIcMM?client_reference_id=${user.id}&prefilled_email=${user.email}`, '_blank')
    } else if (price === '150') {
      // basic yearly plan
      window.open(`https://buy.stripe.com/5kAg1l6VWe5M8h2145?client_reference_id=${user.id}&prefilled_email=${user.email}`, '_blank')
    }
  };

  return (
    <div className="w-full">
      <div
        className={`wow fadeInUp relative z-10 rounded-xl bg-white px-8 py-10 shadow-md shadow-gray dark:bg-[#1D2144]   ${featured? 'border-2 border-gray shadow-xl': 'border-2 border-gray'}`}
        data-wow-delay=".1s"
      >
        <div className="flex items-center justify-between">
          <h3 className="price mb-2 text-3xl font-bold text-black dark:text-white">
            $<span className="amount">{price}</span>
            <span className="time text-body-color">/{duration}</span>
          </h3>
          <h4 className="mb-2 text-xl font-bold text-secondary dark:text-white">
            {packageName}
          </h4>
        </div>
        <p className="mb-7 text-base text-body-color">{subtitle}</p>
        <div className="mb-8 border-b border-body-color border-opacity-10 pb-8 dark:border-white dark:border-opacity-10">
          <button
            disabled={disabled}
            onClick={handleButtonClick}
            className="flex w-full items-center disabled:bg-gray justify-center rounded-md bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
            {disabled? 'Coming Soon' : user.email? subscribed? 'Manage Subscription' : (price==='0')? 'Current plan' : 'Get Started' : 'Sign in'}
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PricingBox;
